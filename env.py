import os

os.environ.setdefault("IP", "0.0.0.0")
os.environ.setdefault("PORT", "5000")
os.environ.setdefault("SECRET_KEY", "Th3Ch33kyBr0wnF0xJmped0v3rTheW411")
os.environ.setdefault("DEBUG", "True")
os.environ.setdefault("DEVELOPMENT", "False")
os.environ.setdefault("DB_URL", "postgresql://postgres:admin@localhost/appointments")
