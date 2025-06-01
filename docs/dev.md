# Building the site

## Local dev server
You will need [deno v2.3.3 or higher](https://github.com/denoland/deno).
```shell
$ deno task dev
```

## Local dev server with docker
```shell
docker run -it --mount=type=bind,src=$(pwd),target=/mnt --workdir=/mnt -p4321:4321 denoland/deno:2.3.3 task devhost
```