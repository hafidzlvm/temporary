-- Create Users
CREATE ROLE project WITH LOGIN PASSWORD 'project';

-- Grant Privileges to User on Databases
GRANT ALL PRIVILEGES ON DATABASE project TO project;

-- Connect to the new database
\c project;

-- Create a new schema and set its owner
CREATE SCHEMA project AUTHORIZATION project;
