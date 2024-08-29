CREATE TABLE [dbo].[Order]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [CustomerId] INT NOT NULL, 
    [Date] SMALLDATETIME NOT NULL DEFAULT GetUTCDate(), 
    CONSTRAINT [FK_Order_To_Customer] FOREIGN KEY (CustomerId) REFERENCES [Customer]([Id])
)
