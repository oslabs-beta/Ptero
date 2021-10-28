FROM denoland/deno:1.15.3

EXPOSE 9000

WORKDIR /app

USER deno

ADD . .

RUN deno cache main.ts

CMD ["run", "--allow-all", "--unstable", "main.ts"]