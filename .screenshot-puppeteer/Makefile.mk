IMAGE ?= local_screenshot-cli
URL ?= http://host.docker.internal:5199
OUTPUT ?= docs/screenshots/screenshot.png
WIDTH ?= 940
HEIGHT ?= 900

.PHONY: build screenshot-puppeteer clean-puppeteer

build:
	docker build -t $(IMAGE) -f .screenshot-puppeteer/Dockerfile .screenshot-puppeteer

screenshot-puppeteer: build
	docker run --rm --init \
		--network host \
		--user "$$(id -u):$$(id -g)" \
		-e HOME=/tmp \
		-v "$(CURDIR):/output" \
		$(IMAGE) \
		"$(URL)" "$(OUTPUT)" $(WIDTH) $(HEIGHT)

clean-puppeteer:
	docker image rm $(IMAGE)
