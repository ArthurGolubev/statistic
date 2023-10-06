from .anova import anova_router
from fastapi import APIRouter


router = APIRouter()

router.include_router(anova_router.router)