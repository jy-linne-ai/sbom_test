FROM ruby:3.3-alpine

WORKDIR /app

RUN apk add --no-cache build-base

COPY Gemfile Gemfile.lock ./
RUN bundle config set --local deployment "true" && \
    bundle config set --local without "development test" && \
    bundle install

COPY app.rb config.ru ./

ENV PORT=3001
EXPOSE 3001

CMD ["bundle", "exec", "puma", "-b", "tcp://0.0.0.0:3001", "config.ru"]
