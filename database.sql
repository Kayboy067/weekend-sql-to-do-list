CREATE TABLE "todos" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(255) NOT NULL,
    "date" DATE,
    "importance" VARCHAR(255) NOT NULL
);

INSERT INTO "todos" 
	("task", "date", "importance") 
VALUES
	('birth the kids', '01-09-2022', 'High'),
	('do the dishes', '01-09-2022', 'Mid'),
	('take my son out to join sch bus', '01-09-2022', 'Mid'),
	('heat up the car and ready for church', '01-09-2022', 'Low');
	
SELECT * FROM todos; 