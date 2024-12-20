IF NOT EXISTS (SELECT * FROM sys.databases WHERE [name] = 'TanariDB')
BEGIN
	CREATE DATABASE [TanariDB];
END
GO

USE [TanariDB];
GO

:setvar path "C:\Github_Repos\Tanari-Weboldal\database"

:r $(path)\tables\Visit.sql
:r $(path)\tables\Nav.sql
:r $(path)\tables\File.sql
:r $(path)\tables\Link.sql