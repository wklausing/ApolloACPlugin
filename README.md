### How to run the server on a GCLOUD instance:

#### Necessary installations:
1. sudo apt-get update
2. sudo apt-get install git
3. sudo apt-get install npm
4. sudo apt install mariadb-server
5. sudo apt-get install unar

#### MySQL setup:
1. sudo mysql_secure_installation (set password to 'test', skip rest)
2. sudo mysql -u root
3. Type 'USE mysql;'
4. Type 'UPDATE user SET plugin='mysql_native_password' WHERE User='root';'
5. Type 'FLUSH PRIVILEGES;'
6. Type 'CREATE database fitbit;'
7. Type 'exit;'
8. sudo service mysql restart
9. mysql -u root -p (for testing)
10. exit;

#### Adding data into MySQL:
1. git clone https://github.com/wklausing/PENG.git
2. cd PENG/server/
3. npm install
4. npm install --dev
5. cd src
6. node index.js
7. CTRL+C
8. cd ../../dataset
9. unar fitbitData.rar
10. cd ../server
11. node src/fillDb.js
12. Exit after no more console logs: CTRL+C
13. cd src
14. node index.js

Steps 1-6: Creates database tables

Steps 7-12: Fills database with test data

Steps 13-14: Running the server
