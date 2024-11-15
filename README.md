# gitcmmt

`gitcmmt` is a lightweight and user-friendly CLI tool designed to simplify and streamline your Git workflow. It automates common Git tasks like staging, committing, and pushing changes, while allowing flexibility through configurable options.

---

## Features

- **Automate Git Commands**:
  - Automatically run `git add .` to stage changes.
  - Commit changes with customizable messages.
  - Push to the desired remote and branch.
- **Customizable Flags**:
  - Skip specific steps (`--skip-add`, `--skip-push`).
  - Customize the branch (`--branch`) and remote (`--remote`).
  - Specify commit messages manually (`--msg`) or use quick templates (`--dbg` for "Bugs fixed").
- **Interactive Push Confirmation**:
  - Ask for confirmation before pushing changes.
- **Auto-Push Option**:
  - Automatically push changes with the `--auto-push` flag.

---

## Installation

Install the package globally via `npm`:

```bash
npm install -g gitcmmt
```

Or run directly using `npx`:

```bash
npx gitcmmt
```

---

## Usage

### Basic Usage

Run the tool to stage, commit, and optionally push changes:

```bash
npx gitcmmt
```

### Available Options

| Option         | Description                                                                 | Default      |
|-----------------|-----------------------------------------------------------------------------|--------------|
| `--skip-add`    | Skip the `git add .` step.                                                 | `false`      |
| `--skip-push`   | Skip the `git push` step.                                                  | `false`      |
| `--branch`      | Specify the branch to push changes to.                                     | `main`       |
| `--remote`      | Specify the remote repository.                                             | `origin`     |
| `--msg`         | Manually set a commit message.                                             | Auto-generated |
| `--dbg`         | Use a quick commit message: "Bugs fixed".                                  | `false`      |
| `--auto-push`   | Automatically push changes without asking for confirmation.                | `false`      |

---

## Examples

### 1. Default

Run the tool without `--auto-push` to get a prompt asking whether to push changes:

```bash
npx gitcmmt
```

### 2. Commit and Push to `main`

```bash
npx gitcmmt --msg "Updated README" --auto-push
```

### 3. Skip Push Step

```bash
npx gitcmmt --skip-push
```

### 4. Customize Remote and Branch

```bash
npx gitcmmt --remote upstream --branch develop
```

### 5. Use Quick Commit Message

```bash
npx gitcmmt --dbg
```

---

## How It Works

1. **Stage Changes**: Automatically stages all changes unless `--skip-add` is used.
2. **Commit Changes**: Commits with a message provided by `--msg`, `--dbg`, or an auto-generated summary of changes.
3. **Push Changes**: Pushes changes to the remote and branch specified, with an optional confirmation step unless `--auto-push` is enabled.

---

## Contributing

We welcome contributions! If you have ideas for improvement or find bugs, feel free to open an issue or submit a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Support

If you encounter issues, please [open an issue on GitHub](https://github.com/your-repo-url) or contact us at `support@example.com`.

Happy coding! 🚀
```

Replace `https://github.com/your-repo-url` and `support@example.com` with the actual links and email address for your project. Let me know if you'd like further adjustments!