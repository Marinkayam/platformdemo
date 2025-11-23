# Monto Design System Skill - Upload Instructions

## Overview

The **Monto Design System Expert** skill has been created and is ready to upload to the Anthropic Console. This will make it available to your entire team across all projects, not just this repository.

## File Information

- **File Name**: `monto-design-system.zip`
- **Location**: Project root directory (`/Users/marinamonto/platformdemo-5/`)
- **File Size**: ~5.3 KB
- **Format**: ZIP archive containing SKILL.md and directory structure

## What's Included

The skill contains comprehensive documentation on:
- ✅ Color palette and design tokens
- ✅ Typography system
- ✅ Spacing guidelines
- ✅ All UI components (buttons, cards, tables, forms, etc.)
- ✅ Layout patterns
- ✅ Interaction states
- ✅ Best practices and common mistakes
- ✅ Code examples for every pattern

## Upload Steps

### Option 1: Upload via Anthropic Console (Recommended)

1. **Go to Anthropic Console**
   - Visit: https://console.anthropic.com/
   - Log in with your Anthropic account

2. **Navigate to Skills**
   - Click on "Skills" in the left sidebar
   - Or go to: https://console.anthropic.com/settings/skills

3. **Upload the Skill**
   - Click "Create Skill" or "Upload Skill"
   - Select `monto-design-system.zip` from your project root
   - The system will automatically detect the SKILL.md file

4. **Verify Upload**
   - Check that the skill name shows as: `monto-design-system`
   - Verify the description appears correctly
   - Review the skill content in the preview

5. **Publish/Save**
   - Complete the upload process
   - The skill will now be available in your organization

### Option 2: Upload via API (Advanced)

If you prefer to use the Anthropic API:

```python
from anthropic import Anthropic

client = Anthropic(api_key="your-api-key")

# Upload skill from directory
skill = client.beta.skills.create(
    name="monto-design-system",
    files=[
        {
            "filename": "SKILL.md",
            "content": open(".claude/skills/monto-design-system/SKILL.md", "rb").read(),
            "mime_type": "text/markdown"
        }
    ]
)
```

## Using the Skill

### In Claude Code

Once uploaded to Anthropic Console, team members can:

1. **Open Claude Code** in any project
2. **Invoke the skill** when needed for design guidance
3. The skill will provide expert advice on Monto design patterns

### In This Repository

The skill is already available locally in:
```
.claude/skills/monto-design-system/SKILL.md
```

Claude Code automatically detects it when working in this project.

## Team Member Access

### For Team Members Using This Repository:
- ✅ Skill is automatically available (already in `.claude/skills/`)
- ✅ Gets updated when they pull from git
- ✅ No setup required

### For Team Members Using Other Projects:
After uploading to Anthropic Console:
- ✅ Install the skill from the Anthropic Skills catalog
- ✅ Available across all their Claude Code sessions
- ✅ Works in any project they're working on

## Skill Metadata

```yaml
name: monto-design-system
description: Expert knowledge of the Monto platform design system including colors, typography, spacing, components, and UI patterns
```

## Version Management

- **Current Version**: 1.0
- **Location**: `.claude/skills/monto-design-system/SKILL.md`
- **Last Updated**: November 23, 2025

### Updating the Skill

When you make changes to the design system:

1. Edit `.claude/skills/monto-design-system/SKILL.md`
2. Commit and push to repository (for local users)
3. Re-upload to Anthropic Console (for cloud users)

## Support & Questions

If team members have questions about:
- **Using the skill**: They can invoke it in Claude Code and ask design questions
- **Installing the skill**: Share this document
- **Updating the skill**: Contact the design system maintainer

## Verification Checklist

After upload, verify:
- [ ] Skill appears in Anthropic Console
- [ ] Name is correctly set to `monto-design-system`
- [ ] Description is visible
- [ ] Content is readable and formatted correctly
- [ ] Team members can find and install it
- [ ] Skill provides accurate design guidance when invoked

## File Structure

```
monto-design-system.zip
└── monto-design-system/
    └── SKILL.md  (13.5 KB)
```

## Next Steps

1. **Upload** `monto-design-system.zip` to Anthropic Console
2. **Share** this document with your team
3. **Test** the skill by asking design-related questions
4. **Update** as your design system evolves

---

**Note**: The skill is already working in this repository. Uploading to Anthropic Console is optional but recommended for team-wide access across all projects.
