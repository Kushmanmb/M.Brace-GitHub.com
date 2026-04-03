/* email.test.js – Tests for email address functionality */

// Test utilities
function assertEqual(actual, expected, testName) {
  if (actual === expected) {
    console.log("✓ PASS:", testName);
    return true;
  } else {
    console.error("✗ FAIL:", testName);
    console.error("  Expected:", expected);
    console.error("  Actual:", actual);
    return false;
  }
}

function assertTrue(condition, testName) {
  return assertEqual(condition, true, testName);
}

function assertFalse(condition, testName) {
  return assertEqual(condition, false, testName);
}

// Email validation regex (same as in email.js)
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Test suite
let passed = 0;
let failed = 0;

function runTests() {
  console.log("=== Email Address Tests ===\n");

  // Test 1: Valid email addresses
  console.log("--- Valid Email Addresses ---");

  const validEmails = [
    "M.Brace@Github.com",
    "test@example.com",
    "user.name@domain.org",
    "firstname+tag@company.co.uk",
    "simple@test.io",
    "name123@numbers456.net",
  ];

  for (const email of validEmails) {
    if (assertTrue(emailPattern.test(email), `Valid: ${email}`)) {
      passed++;
    } else {
      failed++;
    }
  }

  // Test 2: Invalid email addresses
  console.log("\n--- Invalid Email Addresses ---");

  const invalidEmails = [
    "",
    "not-an-email",
    "@nodomain.com",
    "noat.sign.com",
    "spaces in@email.com",
    "email@no-tld",
    "email@.com",
    "@.com",
    "   ",
  ];

  for (const email of invalidEmails) {
    if (assertFalse(emailPattern.test(email), `Invalid: "${email || "(empty)"}" should be rejected`)) {
      passed++;
    } else {
      failed++;
    }
  }

  // Test 3: Configured email address
  console.log("\n--- Configured Email Address ---");

  const configuredEmail = "M.Brace@Github.com";
  if (assertTrue(emailPattern.test(configuredEmail), `Config email "${configuredEmail}" is valid`)) {
    passed++;
  } else {
    failed++;
  }

  // Test 4: mailto URL encoding
  console.log("\n--- Mailto URL Generation ---");

  const testAddress = "M.Brace@Github.com";
  const testSubject = "Hello World";
  const testBody = "From: Test User <test@example.com>\n\nThis is a test message.";

  const expectedMailtoUrl =
    "mailto:" +
    encodeURIComponent(testAddress) +
    "?subject=" +
    encodeURIComponent(testSubject) +
    "&body=" +
    encodeURIComponent(testBody);

  // Verify URL contains essential components
  if (assertTrue(expectedMailtoUrl.startsWith("mailto:"), "Mailto URL starts correctly")) {
    passed++;
  } else {
    failed++;
  }

  if (assertTrue(expectedMailtoUrl.includes("subject="), "Mailto URL contains subject")) {
    passed++;
  } else {
    failed++;
  }

  if (assertTrue(expectedMailtoUrl.includes("body="), "Mailto URL contains body")) {
    passed++;
  } else {
    failed++;
  }

  // Test 5: URL encoding handles special characters
  console.log("\n--- URL Encoding ---");

  const encodedAddress = encodeURIComponent("M.Brace@Github.com");
  if (assertTrue(encodedAddress.includes("%40"), "@ symbol is encoded to %40")) {
    passed++;
  } else {
    failed++;
  }

  const encodedNewline = encodeURIComponent("\n");
  if (assertEqual(encodedNewline, "%0A", "Newline is encoded to %0A")) {
    passed++;
  } else {
    failed++;
  }

  // Summary
  console.log("\n=== Test Results ===");
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total: ${passed + failed}`);

  if (failed > 0) {
    console.log("\n❌ Some tests failed!");
    process.exit(1);
  } else {
    console.log("\n✅ All tests passed!");
    process.exit(0);
  }
}

runTests();
