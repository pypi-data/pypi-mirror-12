#include <math.h>
#include <alsa/asoundlib.h>

// sox /usr/local/mozilla/res/samples/test.wav -r 48000 -c 2 -t .sw test.raw 


int setup(snd_pcm_t *handle,
	  unsigned int rate,
	  unsigned int channels,
	  snd_pcm_format_t format
	  )
{
  snd_pcm_hw_params_t *params;
  snd_pcm_sw_params_t *swparams;

  unsigned int rrate;
  int err, dir;

  snd_pcm_sframes_t buffer_size;
  snd_pcm_sframes_t period_size;
 

  unsigned int buffer_time = 500000;		/* ring buffer length in us */
  unsigned int period_time = 100000;		/* period time in us */

  // snd_spcm_init can do a lot of the following work, but I think it's
  // only in very new alsa versions (like 1.0.6)

  snd_pcm_hw_params_alloca(&params);
  snd_pcm_sw_params_alloca(&swparams);

  err = snd_pcm_hw_params_any(handle, params);
  if (err < 0) {
    printf("Broken configuration for playback: no configurations available: %s\n", snd_strerror(err));
    return err;
  }
  err = snd_pcm_hw_params_set_access(handle, params, SND_PCM_ACCESS_RW_INTERLEAVED);
  if (err < 0) {
    printf("Access type not available for playback: %s\n", snd_strerror(err));
    return err;
  }
  err = snd_pcm_hw_params_set_format(handle, params, format);
  if (err < 0) {
    printf("Sample format not available for playback: %s\n", snd_strerror(err));
    return err;
  }
  err = snd_pcm_hw_params_set_channels(handle, params, channels);
  if (err < 0) {
    printf("Channels count (%i) not available for playbacks: %s\n", channels, snd_strerror(err));
    return err;
  }
  rrate = rate;
  err = snd_pcm_hw_params_set_rate_near(handle, params, &rrate, 0);
  if (err < 0) {
    printf("Rate %iHz not available for playback: %s\n", rate, snd_strerror(err));
    return err;
  }
  if (rrate != rate) {
    printf("Rate doesn't match (requested %iHz, get %iHz)\n", rate, err);
    return -EINVAL;
  }
  err = snd_pcm_hw_params_set_buffer_time_near(handle, params, &buffer_time, &dir);
  if (err < 0) {
    printf("Unable to set buffer time %i for playback: %s\n", buffer_time, snd_strerror(err));
    return err;
  }
  err = snd_pcm_hw_params_get_buffer_size(params, &buffer_size);
  if (err < 0) {
    printf("Unable to get buffer size for playback: %s\n", snd_strerror(err));
    return err;
  }
  err = snd_pcm_hw_params_set_period_time_near(handle, params, &period_time, &dir);
  if (err < 0) {
    printf("Unable to set period time %i for playback: %s\n", period_time, snd_strerror(err));
    return err;
  }
  err = snd_pcm_hw_params_get_period_size(params, &period_size, &dir);
  if (err < 0) {
    printf("Unable to get period size for playback: %s\n", snd_strerror(err));
    return err;
  }
  err = snd_pcm_hw_params(handle, params);
  if (err < 0) {
    printf("Unable to set hw params for playback: %s\n", snd_strerror(err));
    return err;
  }


  /* get the current swparams */
  err = snd_pcm_sw_params_current(handle, swparams);
  if (err < 0) {
    printf("Unable to determine current swparams for playback: %s\n", snd_strerror(err));
    return err;
  }
  /* start the transfer when the buffer is almost full: */
  /* (buffer_size / avail_min) * avail_min */
  err = snd_pcm_sw_params_set_start_threshold(handle, swparams, (buffer_size / period_size) * period_size);
  if (err < 0) {
    printf("Unable to set start threshold mode for playback: %s\n", snd_strerror(err));
    return err;
  }
  /* allow the transfer when at least period_size samples can be processed */
  err = snd_pcm_sw_params_set_avail_min(handle, swparams, period_size);
  if (err < 0) {
    printf("Unable to set avail min for playback: %s\n", snd_strerror(err));
    return err;
  }
  /* align all transfers to 1 sample */
  err = snd_pcm_sw_params_set_xfer_align(handle, swparams, 1);
  if (err < 0) {
    printf("Unable to set transfer align for playback: %s\n", snd_strerror(err));
    return err;
  }
  /* write the parameters to the playback device */
  err = snd_pcm_sw_params(handle, swparams);
  if (err < 0) {
    printf("Unable to set sw params for playback: %s\n", snd_strerror(err));
    return err;
  }
  return 0;
}

static int write_loop(snd_pcm_t *handle, signed short *audio, unsigned int len, unsigned int channels)
{

  signed short *ptr;
  int err, cptr;
  int delayp;

  while (1) {
    ptr = audio;	  
    cptr = len/channels/sizeof(signed short);
    printf("cptr=%d\n",cptr);
    while (cptr > 0) {
      if(err=snd_pcm_delay(handle, &delayp) < 0) {
	printf("error getting delay: %s\n", snd_strerror(err));
	exit(EXIT_FAILURE);
      }
      printf("delay %d\r",delayp);
      err = snd_pcm_writei(handle, ptr, cptr);
      if (err == -EAGAIN)
	continue;

      printf("\nwrote %d, delay is %d\n",err,delayp);
      if (err < 0) {
	printf("Write error: %s\n", snd_strerror(err));
	exit(EXIT_FAILURE);
      }

      ptr += err * channels;
      cptr -= err;
    }
  }
}


snd_output_t *output = NULL;

snd_pcm_t *pcmopen(char *name)
{
  snd_pcm_t *handle;
  int err;

  // just for snd_pcm_dump
  err = snd_output_stdio_attach(&output, stdout, 0);
  if (err < 0) {
    printf("stdio output setup failed: %s\n", snd_strerror(err));
    return 0;
  }

  if ((err = snd_pcm_open(&handle, name, 
			  SND_PCM_STREAM_PLAYBACK, SND_PCM_NONBLOCK)) < 0) {
    printf("Playback open error: %s\n", snd_strerror(err));
    return 0;
  }
  return handle;
}

void pcmdump(snd_pcm_t *handle)
{
  snd_pcm_dump(handle,output);
}


signed short gaudio[140740]; // size of test file
 
int main(int argc, char *argv[])
{
  snd_pcm_t *handle;
  int err;
  FILE *test;


  snd_pcm_format_t format = SND_PCM_FORMAT_S16;	/* sample format */
  unsigned int channels = 2;			/* count of channels */
  unsigned int rate = 48000;			/* stream rate */

  handle = pcmopen("plughw:0,0");
  if (handle==0) {
    exit(EXIT_FAILURE);
  }

  if ((err = setup(handle,rate,channels,format)) < 0) {
    printf("Setting of params failed: %s\n", snd_strerror(err));
    exit(EXIT_FAILURE);
  }
 
  pcmdump(handle);

  //samples = malloc((period_size * channels * snd_pcm_format_width(format)) / 8);

  test = fopen("test.raw","rb");
  fread(gaudio,sizeof(signed),sizeof(gaudio),test);
  fclose(test);

	
  err = write_loop(handle,gaudio,sizeof(gaudio),channels);
  if (err < 0)
    printf("Transfer failed: %s\n", snd_strerror(err));

  snd_pcm_close(handle);
  return 0;
}
