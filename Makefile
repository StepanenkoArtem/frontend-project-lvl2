prettier-write:
	npx prettier-eslint --write **/*.js

install:
	npm install

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	echo 'TEST PENDING'

.PHONY: test prettier-write
