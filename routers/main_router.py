from fastapi import APIRouter
from .anova import anova_router
from .destribution import destribution_router


router = APIRouter()

router.include_router(anova_router.router)
router.include_router(destribution_router.router)