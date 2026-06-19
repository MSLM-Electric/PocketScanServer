CREATE TABLE IF NOT EXISTS driver_licenses (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(200) NOT NULL,
    birth_date DATE NOT NULL,
    doc_number VARCHAR(50) NOT NULL,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);