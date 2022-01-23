prettier-write:
	npx prettier-eslint --write **/*.js

install:
	npm install

publish:
	npm publish --dry-run

lint:
	npx eslint .

.PHONY: test prettier-write
