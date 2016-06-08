required_plugins = %w(vagrant-triggers)

required_plugins.each do |plugin|
  system "vagrant plugin install #{plugin}" unless Vagrant.has_plugin? plugin
end

Vagrant.configure(2) do |config|
  config.vm.box = "les/centos-6.7-x86_64"
  ssh_public_key = File.read("#{Dir.home}/.ssh/id_rsa.pub")
  config.vm.provision "shell", inline: <<-"."
    mkdir -p /root/.ssh
    echo '#{ssh_public_key}' > /root/.ssh/authorized_keys
    chown -R root: /root/.ssh
    chmod 0700 /root/.ssh
    chmod 0600 /root/.ssh/authorized_keys
    chcon -R -u system_u -r object_r -t ssh_home_t -l s0 /root/.ssh
  .
  config.vm.define "athos" do |athos|
    athos.vm.hostname = "athos"
    athos.vm.network "private_network", ip: "192.168.56.6"
    athos.vm.post_up_message = "athos IN A 192.168.56.6"
    athos.vm.provision "shell", inline: <<-"."
      yum -y install centos-release-scl # https://wiki.centos.org/AdditionalResources/Repositories/SCL
      yum -y install httpd24 # httpd24-mod_proxy_html
      #ln -sf /vagrant/httpd.conf /opt/rh/httpd24/root/etc/httpd/conf/httpd.conf # flaky
      /bin/cp /vagrant/httpd.conf /opt/rh/httpd24/root/etc/httpd/conf/
      setenforce permissive # required for proxypass
      /etc/init.d/httpd24-httpd start
      /bin/cp /vagrant/{index.html,orpheus.{js,css}} /opt/rh/httpd24/root/var/www/html/
      mkdir /opt/rh/httpd24/root/var/www/html/chris-adams
      echo '<!doctype html><html><head><title>Chris Adams</title></head><body><h1>Chris Adams</h1><p>A Cajun gunslinger, leader of the seven.</p></body></html>' > /opt/rh/httpd24/root/var/www/html/chris-adams/index.html
      mkdir /opt/rh/httpd24/root/var/www/html/calvera
      echo '<!doctype html><html><head><title>Calvera</title></head><body><h1>Calvera</h1><p>The lead Mexican bandit.</p></body></html>' > /opt/rh/httpd24/root/var/www/html/calvera/index.html 
      yum -y install busybox
      mkdir /opt/vin-tanner
      echo '<!doctype html><html><head><title>Vin Tanner</title></head><body><h1>Vin Tanner</h1><p>The drifter.</p></body></html>' > /opt/vin-tanner/index.html 
      busybox httpd -p 8000 -h /opt/vin-tanner
      iptables -I INPUT 5 -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT
      iptables -I INPUT 6 -m state --state NEW -m tcp -p tcp --dport 443 -j ACCEPT
      iptables -I INPUT 7 -m state --state NEW -m tcp -p tcp --dport 8000 -j ACCEPT
    .
  end
  config.vm.define "porthos" do |porthos|
    porthos.vm.hostname = "porthos"
    porthos.vm.network "private_network", ip: "192.168.56.7"
    porthos.vm.post_up_message = "porthos IN A 192.168.56.7"
    porthos.vm.provision "shell", inline: <<-"."
      #yum -y install python
      mkdir /opt/chico
      echo '<!doctype html><html><head><title>Chico</title></head><body><h1>Chico</h1><p>The young blooded shootist.</p></body></html>' > /opt/chico/index.html
      (cd /opt/chico; nohup python -m SimpleHTTPServer 8001 < /dev/null &> /dev/null &)
      mkdir /opt/bernardo-oreilly
      echo "<!doctype html><html><head><title>Bernardo O'Reilly</title></head><body><h1>Bernardo O'Reilly</h1><p>The desperate professional.</p></body></html>" > /opt/bernardo-oreilly/index.html
      (cd /opt/bernardo-oreilly; nohup python -m SimpleHTTPServer 8002 < /dev/null &> /dev/null &)
      iptables -I INPUT 5 -m state --state NEW -m tcp -p tcp --dport 8001 -j ACCEPT
      iptables -I INPUT 5 -m state --state NEW -m tcp -p tcp --dport 8002 -j ACCEPT
    .
  end
  config.vm.define "aramis" do |aramis|
    aramis.vm.hostname = "aramis"
    aramis.vm.network "private_network", ip: "192.168.56.8"
    aramis.vm.post_up_message = "aramis IN A 192.168.56.8"
    aramis.vm.provision "shell", inline: <<-"."
      yum -y install ruby
      mkdir -p /opt/lee-basset/app
      echo '<!doctype html><html><head><title>Lee Basset</title></head><body><h1>Lee Basset</h1><p>The veteran.</p></body></html>' > /opt/lee-basset/app/index.html
      nohup ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8003, :DocumentRoot => "/opt/lee-basset").start' < /dev/null &> /dev/null &
      mkdir -p /opt/britt-avery/app
      echo '<!doctype html><html><head><title>Britt Avery</title></head><body><h1>Britt Avery</h1><p>The knife expert.</p></body></html>' > /opt/britt-avery/app/index.html
      nohup ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8004, :DocumentRoot => "/opt/britt-avery").start' < /dev/null &> /dev/null &
      iptables -I INPUT 5 -m state --state NEW -m tcp -p tcp --dport 8003 -j ACCEPT
      iptables -I INPUT 5 -m state --state NEW -m tcp -p tcp --dport 8004 -j ACCEPT
    .
  end

  config.trigger.after :up, :vm => "aramis" do
    run "firefox --private-window http://orpheus/ http://athos/ http://athos/chris-adams/ http://athos/calvera/ http://athos:8000/ http://porthos:8001/ http://porthos:8002/ http://aramis:8003/app/ http://aramis:8004/app/"
  end
end
# vi: set ft=ruby :
