# Get the directory that this configuration file exists in
dir = File.dirname(__FILE__)

# Load the sencha-touch framework automatically.
load File.join(dir, '..', '..', 'sdk', 'resources', 'themes')

# Compass configurations
sass_path    = dir
css_path     = File.join(dir, "..", "css")
#environment  = :production
#output_style = :compressed
output_style = (environment == :production) ? :compressed : :expanded

# Push Mountain Lion Notifications
EXCEPTIONS = [StandardError, ScriptError]
begin
require "notifompass"
rescue *EXCEPTIONS
puts "You don't have notifompass gem installed. See http://ghettocooler.net/2012/12/03/mountain-lion-notification-after-sass-compiling/"
begin
require "compass-growl"
rescue *EXCEPTIONS
puts "You don't have compass-growl installed either!"
end
end
