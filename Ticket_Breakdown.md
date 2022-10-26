# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

There are two approaches here, one is we can add a facilityId in the meta data in shift by a columnName customAgentId but it'll be specific to each shift and we'll have to add it everytime we assign a shift. A second and better approach would be to save this info in a many to many table where we'll have facility_id, agent_id, custom_id  which will contain customIds for each agent against each facility. I am assuming that each agent can be assigned to shifts from multiple facilities to making in many to many. 

## Key Tasks: 

1: Give option to Facilities to view agents list and assign them custom ids which will be saved in database. 
    Subtickets:
2: Modify function getShiftsByFacility to include agents custom ids in meta data as well. 
3: Modify reports generation function to use custom ids instead of internal ids. 

# ------------------------------------------------------ #

# Ticket1

####   Title: 
Provide option to assign custom ids to agents for each facility.  
####  Description: 

As a Facility admin, I should be able to view agents list workig with me and assign them custom ids.

#### Technical notes: 

######  Backend: 
    Make a migration to create table facility_agent with columns facility_id, agent_id, custom_id. 
    Make an api to return list of agents working for a specfic functionality. 
    Make a restricted api to add/update entry to facility_agent table with facility_id, agent_id and custom_id. 

###### Frontend: 
    Make a new view/page to list down the agents the working for facility.
    Provide editable text input to save custom id for each facility. 
#### Acceptance Criterion:

Apis Developed to get agents list for facility and save/update the record.
Frontend page developed to consume above two apis and show list of agents in a table with an editable text field of customId. 
Unit tests for both backend and frontend.

# ------------------------------------------------------ #

# Ticket2

#### Title: 
Modify function/api getShiftsByFacility to include agents custom ids in meta data.   

#### Description: 

As a Facility admin, I should be able to get customId of agents when viewing my shifts.

#### Technical notes: 

###### Backend: 
    While fetching shift details, add a join with facility_agent table to include customIds of agents in their metadata.

###### Frontend: 
    Use new customId attribute in getShiftsByFacility function/api to show customId in a separate column

#### Acceptance Criterion:

GetShiftsByFacility Api/function updated to include customId of agents.
Frontend page updated to show customId of agents as well.
Unit tests for both backend and frontend.


# ------------------------------------------------------ #

# Ticket3

#### Title: 
Modify reports generation function to use custom ids instead of internal ids. 

#### Description: 

As a Facility admin, I should be able to view customIds of agents in the generated reports

Technical notes: 

###### Backend:

    Use customIds of agents returned from getShiftsByFacility function while generating reports.

###### Frontend: 
    Use new customId attribute in report generations function/api to show customId instead of internal ids.

#### Acceptance Criterion:
Report generation Api/function updated to include customId of agents instead of internal ids.
Frontend reports page updated to show customId of agents.
Unit tests for both backend and frontend.
