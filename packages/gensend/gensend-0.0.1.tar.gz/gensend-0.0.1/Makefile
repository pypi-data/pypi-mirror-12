all: check test

check: check-deps
check-deps: check-dep-python check-dep-pip check-dep-flake8
check-dep-flake8: ; @which flake8 > /dev/null
check-dep-python: ; @which python > /dev/null
check-dep-pip: ; @which pip > /dev/null
check-dep-isort: ; @which isort > /dev/null

build: ./env/bin/pip
	env/bin/pip install -r requirements.txt

./env/bin/pip: virtualenv
	virtualenv env

virtualenv:
	pip install virtualenv

install: test
	pip install -r ./requirements.txt
	pip install $(CURDIR)

uninstall:
	pip uninstall gensend

clean:
	rm -f .coverage
	find . -regex ".*\.pyc$$" -type f -exec rm {} \;
	find . -regex ".*\\/__pycache__\$$" -type d -prune -exec rm -rf {} \;

clean-build: clean
	rm -rf env

flake8: check-dep-flake8
	flake8 -v ./gensend

isort: check-dep-isort
	isort -rc ./gensend --atomic --diff --verbose

isort-apply: isort
	isort -rc ./gensend --atomic --verbose

test:
	py.test gensend -vs

test-cov:
	py.test -v --cov gensend --cov-report term-missing gensend

.PHONY: build clean check flake8 install isort isort-apply
.PHONY: test test-cov uninstall virtualenv
