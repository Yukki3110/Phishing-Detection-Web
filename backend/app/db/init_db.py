from app.db.base import Base
from app.db.session import engine

from app.models.url_result import URLDetectionResult
from app.models.domain_result import DomainIntelligenceResult
from app.models.homograph_result import HomographResult
from app.models.visual_result import VisualDetectionResult
from app.models.attachment_result import AttachmentResult


def init_db():
    
    print("ENGINE:", engine.url)
    
    print("MODELS:", Base.metadata.tables.keys())
    
    Base.metadata.create_all(bind=engine)
    
    print("DONE")
    
if __name__ == "__main__":
    
    init_db()