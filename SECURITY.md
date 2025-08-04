# Security Policy

## Reporting Security Vulnerabilities

The HookBuilder Platform takes security seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report

Please report security vulnerabilities by emailing **security@hookbuilder.platform** with:

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Any suggested fixes (optional)

### Response Timeline

- **Initial Response**: Within 24 hours
- **Vulnerability Assessment**: Within 72 hours  
- **Fix Timeline**: Critical issues within 7 days, others within 30 days

### Scope

This security policy applies to:
- Smart contracts in `/apps/contracts`
- Backend APIs in `/apps/api`
- Frontend applications in `/apps/web`
- Custom n8n nodes in `/apps/n8n`

### Out of Scope

- Third-party dependencies (report directly to maintainers)
- Issues in development/test environments
- Social engineering attacks

### Responsible Disclosure

We request that you:
- Give us reasonable time to fix issues before public disclosure
- Avoid accessing or modifying user data
- Do not perform attacks that could harm our users

### Bug Bounty

We are planning a bug bounty program for mainnet release. Details will be announced in our documentation.

## Security Best Practices

For developers contributing to HookBuilder:

1. **Smart Contracts**
   - Use OpenZeppelin libraries for standard patterns
   - Implement proper access controls
   - Add reentrancy guards where needed
   - Follow the principle of least privilege

2. **API Security**
   - Validate all inputs
   - Use proper authentication/authorization
   - Implement rate limiting
   - Never log sensitive information

3. **Frontend Security**
   - Sanitize user inputs
   - Use HTTPS everywhere
   - Implement proper CSP headers
   - Validate all wallet connections

## Contact

For security-related questions: security@hookbuilder.platform
For general questions: hello@hookbuilder.platform