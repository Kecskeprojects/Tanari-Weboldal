IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE [TABLE_SCHEMA] = 'dbo' AND [TABLE_NAME] = 'Visit')
BEGIN
	CREATE TABLE [dbo].[Visit] (
		[VisitorId] INT NOT NULL IDENTITY(1,1),
		[VisitCount] BIGINT CONSTRAINT DF_Visit_VisitCount DEFAULT 0 NOT NULL,
		[CreatedOn] DATETIME CONSTRAINT DF_Visit_CreatedOn DEFAULT GETDATE() NOT NULL,
		[ModifiedOn] DATETIME 	CONSTRAINT DF_Visit_ModifiedOn DEFAULT GETDATE() NOT NULL,
		CONSTRAINT PK_VisitorId PRIMARY KEY ([VisitorId]),
	);

	INSERT INTO [dbo].[Visit] ([VisitCount]) VALUES
		(0);
END
GO