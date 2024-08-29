/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/


USE [SalesDatabase]
GO

INSERT INTO [dbo].[Product]
           ([Name]
           ,[Type]
           ,[Price])
     VALUES
           ('Pink Lemonade','Regular',5)

           INSERT INTO [dbo].[Product]
           ([Name]
           ,[Type]
           ,[Price])
     VALUES
           ('Pink Lemonade','Large',10)


           INSERT INTO [dbo].[Product]
           ([Name]
           ,[Type]
           ,[Price])
     VALUES
           ('Lemonade','Regular',4)

           INSERT INTO [dbo].[Product]
           ([Name]
           ,[Type]
           ,[Price])
     VALUES
           ('Lemonade','Large',8)
GO
