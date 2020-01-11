TUMD_FILES = $(shell find . -type f -name 'index.tumd')
HTML_FILES = $(patsubst %.tumd, %.html, $(TUMD_FILES))
ROOT = ${CURDIR}
MD = /home/joseph/dev/tuacm-articles/tumd/

.PHONY: all
all: $(HTML_FILES)

%.html: %.tumd
	@echo convert "$<" to "$@"
	(cd $(MD);./markdown.py "$(ROOT)/$<")
