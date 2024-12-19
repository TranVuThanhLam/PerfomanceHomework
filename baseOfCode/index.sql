-- Tạo index cho cột Title
CREATE NONCLUSTERED INDEX IX_News_Title
ON dbo.news (Title);

-- Tạo index cho cột Description
CREATE NONCLUSTERED INDEX IX_News_Description
ON dbo.news (Description);