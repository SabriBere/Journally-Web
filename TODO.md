# TODO

## GitHub Actions

- Evaluate adding a workflow to delete source branches after they are merged into `develop`.
- The workflow should only delete branches from the same repository.
- It must never delete `develop` or `master`.
- Suggested condition:

```yaml
github.event.pull_request.merged == true &&
github.event.pull_request.base.ref == 'develop' &&
github.event.pull_request.head.repo.full_name == github.repository &&
github.event.pull_request.head.ref != 'develop' &&
github.event.pull_request.head.ref != 'master'
```

- GitHub Actions must have `contents: write` permission for branch deletion.
- Check repository setting: `Settings` -> `Actions` -> `General` -> `Workflow permissions`.
