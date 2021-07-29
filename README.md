### How to run the server on a GCLOUD instance:

#### Necessary installations:
```
1. sudo apt-get update
2. sudo apt-get install git
3. sudo apt-get install npm
4. sudo apt install mariadb-server
```
#### MySQL setup:
```
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
```
#### Adding data into MySQL:
```
1. git clone https://github.com/wklausing/PENG.git
2. cd PENG/server/
3. npm install
4. npm install --dev
5. cd src
6. node index.js
7. CTRL+C
8. cd ../../dataset
9. unzip fitbitData.rar
10. mysql -h localhost -u root -p
11. For the following commands you need to give to right path to the files.
12. Type 'LOAD DATA LOCAL INFILE "YOUR_PATH/dataset/fitbitData/dailyActivity_merged.csv" INTO TABLE DailyActivities FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' (Id,ActivityDate,TotalSteps,TotalDistance,TrackerDistance,LoggedActivitiesDistance,VeryActiveDistance,ModeratelyActiveDistance,LightActiveDistance,SedentaryActiveDistance,VeryActiveMinutes,FairlyActiveMinutes,LightlyActiveMinutes,SedentaryMinutes,Calories);'
13. Type 'LOAD DATA LOCAL INFILE "YOUR_PATH/dataset/fitbitData/dailyIntensities_merged.csv" INTO TABLE DailyIntensities FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' (Id,ActivityDay,SedentaryMinutes,LightlyActiveMinutes,FairlyActiveMinutes,VeryActiveMinutes,SedentaryActiveDistance,LightActiveDistance,ModeratelyActiveDistance,VeryActiveDistance);'
14. Type 'LOAD DATA LOCAL INFILE "YOUR_PATH/dataset/fitbitData/dailySteps_merged.csv" INTO TABLE DailySteps FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' (Id,ActivityDay,StepTotal);'
15. Type 'LOAD DATA LOCAL INFILE "YOUR_PATH/dataset/fitbitData/sleepDay_merged.csv" INTO TABLE SleepDays FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' (Id,SleepDay,TotalSleepRecords,TotalMinutesAsleep,TotalTimeInBed);'
16. Type 'LOAD DATA LOCAL INFILE "YOUR_PATH/dataset/fitbitData/heartrate_seconds_merged.csv" INTO TABLE HeartratePerSeconds FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' (Id,Time,Value);'
17. Type 'LOAD DATA LOCAL INFILE "YOUR_PATH/dataset/fitbitData/weightLogInfo_merged.csv" INTO TABLE WeightPounds FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' (Id,Date,WeightKg,WeightPounds,Fat,BMI,IsManualReport,LogId);'
18. Type 'LOAD DATA LOCAL INFILE "YOUR_PATH/dataset/Persons.csv" INTO TABLE Persons FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' (Id,First_name,Last_name,Company_name,Address,City,County,State,Zip,Phone1,Phone2,Email,Web);'
19. cd ../src
20. node index.js
```
- Steps 1-6: Creates database tables
- Steps 7-18: Fills database with test data
- Steps 19-20: Running the server
