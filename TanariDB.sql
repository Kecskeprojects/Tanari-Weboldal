IF NOT EXISTS (SELECT * FROM sys.databases WHERE [name] = 'TanariDB')
BEGIN
	CREATE DATABASE [TanariDB];
END
GO

USE [TanariDB];
GO

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE [TABLE_SCHEMA] = 'dbo' AND [TABLE_NAME] = 'Nav')
BEGIN
	CREATE TABLE [dbo].[Nav] (
		[NavId] INT NOT NULL IDENTITY(1,1),
		[Name] NVARCHAR(50) NOT NULL,
		[Url] NVARCHAR(500) NULL,
		[ParentNavId] INT NULL,
		[CreatedOn] DATETIME CONSTRAINT DF_Nav_CreatedOn DEFAULT GETDATE() NOT NULL,
		CONSTRAINT PK_NavId PRIMARY KEY ([NavId]),
		CONSTRAINT FK_ParentNavId_NavId FOREIGN KEY ([ParentNavId]) REFERENCES [dbo].[Nav] ([NavId]) ON DELETE NO ACTION
	);

	--only for testing
	INSERT INTO [dbo].[Nav] ([Name], [Url], [ParentNavId]) VALUES
		('Test-nav', 'test-nav', NULL),
		('Test-nav 2', 'test2', 1);
END
GO

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE [TABLE_SCHEMA] = 'dbo' AND [TABLE_NAME] = 'File')
BEGIN
	CREATE TABLE [dbo].[File] (
		[FileId] INT NOT NULL IDENTITY(1,1),
		[Name] NVARCHAR(200) NOT NULL,
		[Extension] NVARCHAR(10) NOT NULL,
		[Content] VARBINARY(MAX) NOT NULL,
		[NavId] INT NOT NULL,
		[CreatedOn] DATETIME CONSTRAINT DF_File_CreatedOn DEFAULT GETDATE() NOT NULL,
		CONSTRAINT PK_FileId PRIMARY KEY ([FileId]),
		CONSTRAINT FK_FileNavId_Nav FOREIGN KEY ([NavId]) REFERENCES [dbo].[Nav] ([NavId]) ON DELETE CASCADE ON UPDATE NO ACTION
	);
END
GO

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE [TABLE_SCHEMA] = 'dbo' AND [TABLE_NAME] = 'Link')
BEGIN
	CREATE TABLE [dbo].[Link] (
		[LinkId] INT NOT NULL IDENTITY(1,1),
		[Url] NVARCHAR(500) NOT NULL,
		[Title] NVARCHAR(100) NOT NULL,
		[OpenNewTab] BIT CONSTRAINT DF_Link_OpenNewTab DEFAULT 0 NOT NULL,
		[NavId] INT NOT NULL,
		[CreatedOn] DATETIME CONSTRAINT DF_Link_CreatedOn DEFAULT GETDATE() NOT NULL,
		CONSTRAINT PK_LinkId PRIMARY KEY ([LinkId]),
		CONSTRAINT FK_LinkNavId_Nav FOREIGN KEY ([NavId]) REFERENCES [dbo].[Nav] ([NavId]) ON DELETE CASCADE ON UPDATE NO ACTION
	);
END
GO

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