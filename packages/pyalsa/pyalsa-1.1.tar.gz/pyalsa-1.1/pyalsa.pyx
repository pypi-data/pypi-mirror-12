import errno

cdef extern from "alsa/asoundlib.h":
    cdef enum snd_pcm_stream_t:
        SND_PCM_STREAM_PLAYBACK = 0

    ctypedef enum snd_pcm_access_t:
            SND_PCM_ACCESS_MMAP_INTERLEAVED = 0,
            SND_PCM_ACCESS_MMAP_NONINTERLEAVED,
            SND_PCM_ACCESS_MMAP_COMPLEX,
            SND_PCM_ACCESS_RW_INTERLEAVED,
            SND_PCM_ACCESS_RW_NONINTERLEAVED,
            SND_PCM_ACCESS_LAST = SND_PCM_ACCESS_RW_NONINTERLEAVED

    ctypedef enum snd_pcm_format_t:
        SND_PCM_FORMAT_UNKNOWN = -1, SND_PCM_FORMAT_S8 = 0,
        SND_PCM_FORMAT_U8, SND_PCM_FORMAT_S16_LE,
        SND_PCM_FORMAT_S16_BE, SND_PCM_FORMAT_U16_LE,
        SND_PCM_FORMAT_U16_BE, SND_PCM_FORMAT_S24_LE,
        SND_PCM_FORMAT_S24_BE, SND_PCM_FORMAT_U24_LE,
        SND_PCM_FORMAT_U24_BE, SND_PCM_FORMAT_S32_LE,
        SND_PCM_FORMAT_S32_BE, SND_PCM_FORMAT_U32_LE,
        SND_PCM_FORMAT_U32_BE, SND_PCM_FORMAT_FLOAT_LE,
        SND_PCM_FORMAT_FLOAT_BE, SND_PCM_FORMAT_FLOAT64_LE,
        SND_PCM_FORMAT_FLOAT64_BE, SND_PCM_FORMAT_IEC958_SUBFRAME_LE,
        SND_PCM_FORMAT_IEC958_SUBFRAME_BE, SND_PCM_FORMAT_MU_LAW,
        SND_PCM_FORMAT_A_LAW, SND_PCM_FORMAT_IMA_ADPCM,
        SND_PCM_FORMAT_MPEG, SND_PCM_FORMAT_GSM,
        SND_PCM_FORMAT_SPECIAL = 31, SND_PCM_FORMAT_S24_3LE = 32,
        SND_PCM_FORMAT_S24_3BE, SND_PCM_FORMAT_U24_3LE,
        SND_PCM_FORMAT_U24_3BE, SND_PCM_FORMAT_S20_3LE,
        SND_PCM_FORMAT_S20_3BE, SND_PCM_FORMAT_U20_3LE,
        SND_PCM_FORMAT_U20_3BE, SND_PCM_FORMAT_S18_3LE,
        SND_PCM_FORMAT_S18_3BE, SND_PCM_FORMAT_U18_3LE,
        SND_PCM_FORMAT_U18_3BE, SND_PCM_FORMAT_LAST = SND_PCM_FORMAT_U18_3BE,
        SND_PCM_FORMAT_S16 = SND_PCM_FORMAT_S16_LE,
        SND_PCM_FORMAT_U16 = SND_PCM_FORMAT_U16_LE,
        SND_PCM_FORMAT_S24 = SND_PCM_FORMAT_S24_LE,
        SND_PCM_FORMAT_U24 = SND_PCM_FORMAT_U24_LE,
        SND_PCM_FORMAT_S32 = SND_PCM_FORMAT_S32_LE,
        SND_PCM_FORMAT_U32 = SND_PCM_FORMAT_U32_LE,
        SND_PCM_FORMAT_FLOAT = SND_PCM_FORMAT_FLOAT_LE,
        SND_PCM_FORMAT_FLOAT64 = SND_PCM_FORMAT_FLOAT64_LE,
        SND_PCM_FORMAT_IEC958_SUBFRAME = SND_PCM_FORMAT_IEC958_SUBFRAME_LE



    ctypedef struct snd_output_t
    ctypedef struct snd_pcm_t
    ctypedef struct snd_pcm_hw_params_t
    ctypedef struct snd_pcm_sw_params_t
    ctypedef unsigned int snd_pcm_sframes_t
    ctypedef unsigned int snd_pcm_uframes_t
    
    ctypedef void (*snd_lib_error_handler_t)(char *file, int line,
                                             char *function, int err,
                                             char *fmt, ...)

    ctypedef struct FILE

    int snd_output_stdio_attach(snd_output_t **outputp, FILE *fp, int _close)
    int snd_pcm_open(snd_pcm_t **pcm, char *name, 
                     snd_pcm_stream_t stream, int mode)
    int snd_pcm_dump(snd_pcm_t *pcm, snd_output_t *out)
    char *snd_strerror(int errnum)
    int snd_lib_error_set_handler(snd_lib_error_handler_t handler)
    int snd_pcm_close(snd_pcm_t *pcm)

    int snd_pcm_hw_params_malloc(snd_pcm_hw_params_t **ptr)
    void snd_pcm_hw_params_free(snd_pcm_hw_params_t *obj)
    int snd_pcm_sw_params_malloc(snd_pcm_sw_params_t **ptr)
    void snd_pcm_sw_params_free(snd_pcm_sw_params_t *obj)
    int snd_pcm_hw_params_any(snd_pcm_t *pcm, snd_pcm_hw_params_t *params)
    int snd_pcm_hw_params_set_access(snd_pcm_t *pcm, snd_pcm_hw_params_t *params, snd_pcm_access_t access)
    int snd_pcm_hw_params_set_format(snd_pcm_t *pcm, snd_pcm_hw_params_t *params, snd_pcm_format_t val)

    int snd_pcm_hw_params_set_period_time_near(snd_pcm_t *pcm, snd_pcm_hw_params_t *params, unsigned int *val, int *dir)
    int snd_pcm_hw_params_set_channels(snd_pcm_t *pcm, snd_pcm_hw_params_t *params, unsigned int val)
    int snd_pcm_hw_params_set_rate_near(snd_pcm_t *pcm, snd_pcm_hw_params_t *params, unsigned int *val, int *dir)
    int snd_pcm_hw_params_set_buffer_time_near(snd_pcm_t *pcm, snd_pcm_hw_params_t *params, unsigned int *val, int *dir)
    int snd_pcm_hw_params_get_buffer_size(snd_pcm_hw_params_t *params, snd_pcm_uframes_t *val)
    int snd_pcm_hw_params_get_period_size(snd_pcm_hw_params_t *params, snd_pcm_uframes_t *frames, int *dir)
    int snd_pcm_hw_params(snd_pcm_t *pcm, snd_pcm_hw_params_t *params)
    int snd_pcm_sw_params_current(snd_pcm_t *pcm, snd_pcm_sw_params_t *params)
    int snd_pcm_sw_params_set_start_threshold(snd_pcm_t *pcm, snd_pcm_sw_params_t *params, snd_pcm_uframes_t val)
    int snd_pcm_sw_params_set_avail_min(snd_pcm_t *pcm, snd_pcm_sw_params_t *params, snd_pcm_uframes_t val)
    int snd_pcm_sw_params_set_xfer_align(snd_pcm_t *pcm, snd_pcm_sw_params_t *params, snd_pcm_uframes_t val)
    int snd_pcm_sw_params(snd_pcm_t *pcm, snd_pcm_sw_params_t *params)
    int snd_pcm_delay(snd_pcm_t *pcm, snd_pcm_sframes_t *delayp)
    snd_pcm_sframes_t snd_pcm_writei(snd_pcm_t *pcm, void *buffer, snd_pcm_uframes_t size)
    int snd_pcm_reset(snd_pcm_t *pcm)
    int snd_pcm_drop(snd_pcm_t *pcm)
    int snd_pcm_prepare(snd_pcm_t *pcm)
    int snd_pcm_nonblock(snd_pcm_t *pcm, int nonblock)
    int snd_pcm_start(snd_pcm_t *pcm)
    
cdef extern from "stdio.h":
    cdef FILE *stdout

SND_PCM_NONBLOCK =         0x0001

class AlsaError(Exception):
    pass

##### this doesnt work because the va_arg stuff is wrong. without this
##### section, errs go to stderr
#####
## cdef extern from "stdarg.h":
##     ctypedef va_list
##     void va_start( va_list ap, char *fmt)
## #    type va_arg( va_list ap, type)
##     void va_end( va_list ap)
## cdef void handler(char *file, int line, char *function, int err, char *fmt, ...):   
##     cdef va_list arg
##     va_start(arg, fmt)
##     print fmt % arg
##     va_end(arg)
## snd_lib_error_set_handler(<snd_lib_error_handler_t>handler)

def sndcall(ret,errmsg=""):
    if ret<0:
        if errmsg!="":
            errmsg = errmsg+": "
        raise AlsaError(errmsg + snd_strerror(ret))

cdef class Pcm:
    cdef snd_output_t *output
    cdef snd_pcm_t *pcm
    def __new__(self,name="plughw:0,0"):
        self.output = NULL
        self.pcm = NULL
        sndcall(snd_output_stdio_attach(&self.output, stdout, 0),
                errmsg="stdio output setup failed")
        sndcall(snd_pcm_open(&self.pcm, name,
                             SND_PCM_STREAM_PLAYBACK, 0),
                errmsg="Playback open error")
        sndcall(snd_pcm_nonblock(self.pcm, SND_PCM_NONBLOCK),
                errmsg="nonblock mode")

    def setup(self, rate, channels, format_name,
              start_threshold="full", avail_min="period"):
        """start_threshold and avail_min can be provided as number-of-frames"""
        
        cdef snd_pcm_hw_params_t *params
        cdef snd_pcm_sw_params_t *swparams

        cdef unsigned int rrate
        cdef int dir

        cdef snd_pcm_uframes_t buffer_size
        cdef snd_pcm_uframes_t period_size

        cdef snd_pcm_format_t format
        if format_name=="S16_LE":
            format = SND_PCM_FORMAT_S16_LE
        else:
            raise NotImplementedError

        cdef snd_pcm_sframes_t buffer_time
        buffer_time = 500000 # /* ring buffer length in us */
        cdef snd_pcm_sframes_t period_time
        period_time = 100000 # /* period time in us */

        # snd_spcm_init can do a lot of the following work, but I think it's
        # only in very new alsa versions (like 1.0.6)

        sndcall(snd_pcm_hw_params_malloc(&params))
        sndcall(snd_pcm_sw_params_malloc(&swparams))

        sndcall(snd_pcm_hw_params_any(self.pcm, params),
                errmsg="Broken configuration for playback: no configurations available")


        sndcall(snd_pcm_hw_params_set_access(self.pcm, params,
                                             SND_PCM_ACCESS_RW_INTERLEAVED),
                errmsg="Access type not available for playback")
        
        sndcall(snd_pcm_hw_params_set_format(self.pcm, params, format),
                errmsg="Sample format not available for playback")
        
        sndcall(snd_pcm_hw_params_set_channels(self.pcm, params, channels),
                errmsg="Channels count (%i) not available for playbacks")
        
        rrate = rate
        sndcall(snd_pcm_hw_params_set_rate_near(self.pcm, params, &rrate, NULL),
                errmsg="Rate %iHz not available for playback" % rate)
        
        if rrate != rate:
            raise AlsaError("Rate doesn't match (requested %iHz, get %iHz)" %
                            (rate, err))

        sndcall(snd_pcm_hw_params_set_buffer_time_near(self.pcm, params,
                                                       &buffer_time, &dir),
                errmsg="Unable to set buffer time %i for playback" % buffer_time)
        
        sndcall(snd_pcm_hw_params_get_buffer_size(params, &buffer_size),
                errmsg="Unable to get buffer size for playback")
        
        sndcall(snd_pcm_hw_params_set_period_time_near(self.pcm, params,
                                                       &period_time, &dir),
                errmsg="Unable to set period time %i for playback" % period_time)

        sndcall(snd_pcm_hw_params_get_period_size(params, &period_size, &dir),
                errmsg="Unable to get period size for playback")
        
        sndcall(snd_pcm_hw_params(self.pcm, params),
                errmsg="Unable to set hw params for playback")



        # /* get the current swparams */
        sndcall(snd_pcm_sw_params_current(self.pcm, swparams),
                errmsg="Unable to determine current swparams for playback")
        
        # /* start the transfer when the buffer is almost full: */
        # /* (buffer_size / avail_min) * avail_min */
        if start_threshold=="full":
            start_threshold = (buffer_size / period_size) * period_size
        sndcall(snd_pcm_sw_params_set_start_threshold(self.pcm, swparams,
                                                      start_threshold),
                errmsg="Unable to set start threshold mode for playback")
        
        # /* allow the transfer when at least period_size samples can be processed */
        if avail_min=="period":
            avail_min=period_size
        sndcall(snd_pcm_sw_params_set_avail_min(self.pcm, swparams,avail_min),
                errmsg="Unable to set avail min for playback")
        
        # /* align all transfers to 1 sample */
        sndcall(snd_pcm_sw_params_set_xfer_align(self.pcm, swparams, 1),
                errmsg="Unable to set transfer align for playback")
        
        # /* write the parameters to the playback device */
        sndcall(snd_pcm_sw_params(self.pcm, swparams),
                errmsg="Unable to set sw params for playback")


    def delay(self, recover=True):
        """returns delay in frames

        Delay is distance between current application frame position
        and sound frame position. It's positive and less than buffer
        size in normal situation, negative on playback underrun and
        greater than buffer size on capture overrun.  """
        cdef snd_pcm_sframes_t delayp
        err = snd_pcm_delay(self.pcm, &delayp)
        if recover and err == -errno.EPIPE:
            self.recover(err)
            sndcall(snd_pcm_delay(self.pcm, &delayp),
                    errmsg="error getting delay after recovery")
        else:
            sndcall(err, errmsg="error getting delay")
        return delayp

    def reset(self):
        """Reset PCM position; Reduce PCM delay to 0."""
        sndcall(snd_pcm_reset(self.pcm),
                errmsg="reset")


    def drop(self):
        """This function stops the PCM immediately. The pending
        samples on the buffer are ignored."""
        sndcall(snd_pcm_drop(self.pcm),
                errmsg="drop")
        sndcall(snd_pcm_prepare(self.pcm),
                errmsg="prepare after drop")

#    def start(self):
#        """change from SETUP to PREPARED"""
#        sndcall(snd_pcm_start(self.pcm),errmsg="start")

    def writei(self, buf, frames, recover=True):
        """write interleaved frames. returns None for EAGAIN or frames
        written"""
        
        cdef snd_pcm_sframes_t err
        cdef char *ptr
        ptr = buf
        err = snd_pcm_writei(self.pcm, <void *>ptr, frames)
        if recover and -err in (errno.EPIPE, errno.ESTRPIPE):
            self.recover(err)
            return 0
        elif err == -errno.EAGAIN:
            return None
        else:
            sndcall(err,errmsg="write error")
        
        return int(err)

    def dump(self):
        sndcall(snd_pcm_dump(self.pcm, self.output))

    def recover(self,err):
        """underrun and suspend recovery"""
        if err == -errno.EPIPE:
            sndcall(snd_pcm_prepare(self.pcm),
                    errmsg="can't recover from underrun")
        elif err == -errno.ESTRPIPE:
            raise NotImplementedError("suspend recover not ported")
            ##   while ((err = snd_pcm_resume(handle)) == -EAGAIN)
##                         sleep(1);       /* wait until the suspend flag is released */
##                 if (err < 0) {
##                         err = snd_pcm_prepare(handle);
##                         if (err < 0)
##                                 printf("Can't recovery from suspend, prepare failed: %s\n", snd_strerror(err));
##                 }
##                 return 0;


    def __dealloc__(self):
        if self.pcm!=NULL:
            err = snd_pcm_close(self.pcm)
            if err<0:
                raise MemoryError("snd_pcm_close failed")

