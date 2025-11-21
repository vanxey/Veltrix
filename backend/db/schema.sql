CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE trade_direction AS ENUM ('Buy', 'Sell');
CREATE TYPE trade_outcome AS ENUM ('Win', 'Loss', 'BE');
CREATE TYPE news_impact_level AS ENUM ('High', 'Medium', 'Low');

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW(); 
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    is_verified BOOLEAN DEFAULT false,
    verification_token VARCHAR(255),
    verification_token_expires_at TIMESTAMP,
    is_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE session (
    session_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(20) NOT NULL UNIQUE,
    start_time TIMESTAMP,
    end_time TIMESTAMP
);

CREATE TABLE source (
    source_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE tag (
    tag_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    tag_name VARCHAR(50) NOT NULL,
    tag_type VARCHAR(20) NOT NULL, 
    tag_color VARCHAR(20) DEFAULT 'blue'
);

CREATE TABLE trade (
    trade_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES session(session_id) ON DELETE CASCADE,
    asset VARCHAR(50) NOT NULL,
    direction trade_direction NOT NULL,
    strategy VARCHAR(255),
    entry_price NUMERIC(20,8),
    exit_price NUMERIC(20,8),
    size NUMERIC(20,8) NOT NULL,
    take_profit NUMERIC(20,8),
    stop_loss NUMERIC(20,8),
    pnl NUMERIC(20,8),
    entry_date TIMESTAMP NOT NULL,
    exit_date TIMESTAMP,
    outcome trade_outcome NOT NULL,
    notes TEXT,
    screenshot_url TEXT,
    is_reviewed BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE news_article (
    article_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id UUID NOT NULL REFERENCES source(source_id),
    title VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL UNIQUE,
    impact_level news_impact_level NOT NULL,
    snippet TEXT,
    publication_date TIMESTAMP NOT NULL
);

CREATE TABLE trade_tags (
    trade_id UUID NOT NULL REFERENCES trade(trade_id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES tag(tag_id) ON DELETE CASCADE,
    PRIMARY KEY (trade_id, tag_id)
);

CREATE TABLE news_article_tags (
    article_id UUID NOT NULL REFERENCES news_article(article_id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES tag(tag_id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, tag_id)
);

CREATE TABLE user_news_feed_preference (
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    source_id UUID NOT NULL REFERENCES source(source_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, source_id)
);

CREATE INDEX idx_trade_user_id ON trade(user_id);
CREATE INDEX idx_trade_entry_date ON trade(entry_date);
CREATE INDEX idx_trade_user_date ON trade(user_id, entry_date);
CREATE INDEX idx_news_publication_date ON news_article(publication_date);
CREATE INDEX idx_tag_name ON tag(tag_name);
CREATE INDEX idx_tag_type ON tag(tag_type);

CREATE TRIGGER update_trade_updated_at
BEFORE UPDATE ON trade
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();