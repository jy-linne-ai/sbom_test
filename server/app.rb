require "sinatra"
require "json"
require "time"

configure do
  set :port, ENV.fetch("PORT", 3001).to_i
  set :bind, "0.0.0.0"
end

get "/health" do
  content_type :json
  {
    status: "ok",
    service: "sbom-test-server",
    timestamp: Time.now.utc.iso8601,
  }.to_json
end
