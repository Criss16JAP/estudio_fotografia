from backend.domain.interfaces import IModelAdapter
from backend.domain.schemas import AIProvider


class AIModelFactory:

    @staticmethod
    def create(provider: AIProvider) -> IModelAdapter:
        if provider == AIProvider.GEMINI:
            from backend.infrastructure.gemini_adapter import GeminiAdapter
            return GeminiAdapter()

        if provider == AIProvider.OPENAI:
            from backend.infrastructure.openai_adapter import OpenAIAdapter
            return OpenAIAdapter()

        if provider == AIProvider.CLAUDE:
            from backend.infrastructure.claude_adapter import ClaudeAdapter
            return ClaudeAdapter()

        raise ValueError(f"Proveedor no soportado: {provider}")
