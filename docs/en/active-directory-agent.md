# Active Directory and PassMan DC Agent Service

PassMan DC Agent Service runs near the domain controller and synchronizes directory metadata into PassMan. It does not send the AD bind password or AD user passwords to PassMan.

![PassMan Active Directory sync tree](../../assets/screenshots/active-directory-sync-tree.png)

## Service Identity

| Item | Value |
| --- | --- |
| Service name | `PassManDCAgent` |
| Display name | `PassMan DC Agent Service` |
| Config file | `%ProgramData%\PassMan\ad-agent\passman-dc-agent.json` |
| Service log | `%ProgramData%\PassMan\ad-agent\passman-dc-agent-service.log` |
| Agent log | `%ProgramData%\PassMan\ad-agent\passman-dc-agent.log` |

## Enrollment Flow

1. Open PassMan: Integrations -> Active Directory.
2. Create an agent record.
3. Download `passman-ad-agent.ps1` from the release assets or the UI.
4. Run the install command on the agent machine from an Administrator PowerShell.

```powershell
powershell -ExecutionPolicy Bypass -File .\passman-ad-agent.ps1 -InstallService -PassManUrl "<PASSMAN_URL>" -AgentId "<AGENT_ID>" -AgentToken "<AGENT_TOKEN>"
```

The script asks for:

- Domain controller IP or hostname.
- AD bind username.
- AD bind password through the local terminal prompt.

The password is captured locally, not written to logs, and never posted to PassMan.

## Operations Commands

```powershell
powershell -ExecutionPolicy Bypass -File .\passman-ad-agent.ps1 -Status
```

```powershell
powershell -ExecutionPolicy Bypass -File .\passman-ad-agent.ps1 -TailLog
```

```powershell
powershell -ExecutionPolicy Bypass -File .\passman-ad-agent.ps1 -RepairService
```

```powershell
powershell -ExecutionPolicy Bypass -File .\passman-ad-agent.ps1 -UninstallService
```

## What Appears In PassMan

After sync, the Active Directory tab shows:

- Provider status and last sync.
- Domain controller, domain, base DN and agent version.
- OU, group and user tree with search.
- Separate checkbox scopes for login access and credential import.
- Import action for selected credential candidates.

## Hardening Notes

- Prefer `DOMAIN\username` or `username@domain.local` for bind users.
- Use a delegated account with the narrowest read scope that meets the sync need.
- Keep the agent on a controlled Windows host close to the DC.
- Rotate the agent token if the setup command was copied into an unsafe channel.
- Use the PassMan UI to revoke or recreate the agent record when rebuilding the agent machine.

## Troubleshooting

| Symptom | Action |
| --- | --- |
| Service does not install | Run Administrator PowerShell and inspect the service log. |
| Wrapper compile fails | Use the latest `passman-ad-agent.ps1`; repair stops the old service and rebuilds the wrapper safely. |
| PassMan URL unreachable | Test the URL from the agent machine and verify firewall/DNS. |
| Sync shows zero objects | Confirm bind account scope and base DN. |
| Agent connected but tree stale | Use Sync now, then check service and agent logs. |
