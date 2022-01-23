prettier-write:
	npx prettier-eslint --write **/*.js

publish:
    npm publish --dry-run

lint:
	npx eslint .

.PHONY: test prettier-write
