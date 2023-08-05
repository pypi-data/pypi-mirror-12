
go: pyalsa.so
	python playtest

install:
	python setup.py install

pyalsa.so: pyalsa.pyx setup.py
	python setup.py build_ext --inplace

play: play.c
	gcc -lasound play.c -o play -Wall
