PYTHON		= python
SETUP		= $(PYTHON) setup.py
TESTRUNNER	= $(shell which nosetests)

all:	CHANGES.rst

CHANGES.rst:
	git log --oneline --pretty=format:"* %ad: %s\n" --date=short > CHANGES.rst

setup:
	pip install -r requirements.txt

build:
	$(SETUP) build

install:
	$(SETUP) install

clean:
	-rm -f CHANGES.rst

test:
	$(TESTRUNNER)

coverage:	build
	PYTHONPATH = . \
	$(PYTHON) $(TESTRUNNER) \
	--cover-package=pylit \
	--with-coverage \
	--cover-erase \
	--cover-inclusive pylit

.PHONY:	all install clean test
