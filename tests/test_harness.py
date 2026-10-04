import pytest
from backend.ai.gemma.harness import KisanMitraHarness

def test_harness_initialization():
    harness = KisanMitraHarness()
    assert hasattr(harness, 'is_available')

def test_fallback_explanation():
    harness = KisanMitraHarness()
    scheme = {
        "name": "Test Scheme",
        "benefit": "Test Benefit",
        "eligibility": "Test Eligibility"
    }
    result = harness._fallback_explanation(scheme, "en")
    assert "Test Scheme" in result
    assert "Test Benefit" in result
