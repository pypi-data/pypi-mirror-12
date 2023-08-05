
RELEASE:=$(shell python -c 'import templayer; print templayer.__version__')
SOURCE:=setup.py templayer.py docgen_tutorial.py tmpl_tutorial.html \
	docgen_reference.py Makefile
DOCS:= docs/reference.html docs/tutorial.html docs/tutorial_examples.tar.gz

dist: templayer-$(RELEASE).tar.gz

.PHONY: dist

templayer-$(RELEASE).tar.gz: $(SOURCE) $(DOCS)
	tar czvf $@ --transform "s{{templayer-$(RELEASE)/{" $(SOURCE) $(DOCS)

docs:
	mkdir $@

docs/reference.html: docgen_reference.py templayer.py docs
	# make sure it runs properly before touching target
	python $< > $@.incoming
	mv $@.incoming $@

docs/tutorial.html: docgen_tutorial.py templayer.py tmpl_tutorial.html docs
	# make sure it runs properly before touching target
	python $< -H > $@.incoming
	mv $@.incoming $@

docs/tutorial_examples: docs
	mkdir $@

docs/tutorial_examples.tar.gz: docgen_tutorial.py templayer.py \
		tmpl_tutorial.html docs/tutorial_examples
	( cd docs/tutorial_examples && 	python ../../$< -s )
	( cd docs && tar czvf tutorial_examples.tar.gz tutorial_examples )

clean:
	for fn in docs build templayer.pyc templayer-*.tar.gz; do \
		if [ -e "$$fn" ]; then rm -r "$$fn"; fi \
	done

.PHONY: clean

