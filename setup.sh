lsb_release -a
ls
code .
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
pwd
ls
mkdir Development
cd Development/
mkdir unit-5 unit-6 unit-7 unit-8
ls
explorer.exe .
git config --global user.name "benspector-mls"
git config --global user.email "ben@marcylabschool.org"
git config --global credential.helper store
git config --global user.name
cat ~/.ssh/id_rsa.pub
ssh-keygen
cat ~/.ssh/id_rsa.pub
cd ..
cd Development/
cd 
sudo apt update
sudo apt install postgresql postgresql-contrib
wsl --version
psql --version
sudo service postgresql status
sudo service postgresql start
sudo passwd postgres
sudo service postgresql restart
sudo -u postgres psql
sudo -u postgres createuser benspector
sudo -u postgres psql
sudo service postgresql start
sudo service postgresql stop
sudo service postgresql start
