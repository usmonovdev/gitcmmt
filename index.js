#!/usr/bin/env node

const { execSync } = require("child_process");
const yargs = require("yargs");
const chalk = require("chalk");
const readline = require("readline");

// colored console.log's
const log = {
  success: (text) => console.log(chalk.green(text)),
  info: (text) => console.log(chalk.blue(text)),
  warning: (text) => console.log(chalk.yellow(text)),
  error: (text) => console.log(chalk.red("✖ ") + text),
  title: (text) => console.log(chalk.magenta.bold("\n" + text)),
};

// CLI flags
const argv = yargs
  .option("skip-add", {
    type: "boolean",
    description: "Skip the <git add .> step",
    default: false,
  })
  .option("skip-push", {
    type: "boolean",
    description: "Skip the <git push origin main> step",
    default: false,
  })
  .option("branch", {
    type: "string",
    description: "Change <branch> name",
    default: "main",
  })
  .option("remote", {
    type: "string",
    description: "Change <remote>",
    default: "origin",
  })
  .option("msg", {
    type: "string",
    description: "Manually enter Commit message",
  })
  .option("dbg", {
    type: "boolean",
    description: "Add Quick Commit message: Bugs fixed",
    default: false,
  })
  .option("auto-push", {
    type: "boolean",
    description: "Automatically push after committing",
    default: false,
  })
  .help().argv;

// Ask question
const askQuestion = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    })
  );
};

(async () => {
  try {
    // Git add
    if (!argv.skipAdd) {
      execSync("git add .", { stdio: "inherit" });
    }

    // Git diff
    const changes = execSync("git diff --name-only HEAD", { encoding: "utf8" });

    if (!changes) {
      log.warning("No changes detected. Exiting.");
      process.exit(0);
    }

    const minimizeChanges =
      changes.length > 300 ? changes.slice(0, 300) : changes;

    // Git commit
    const commitMessage = argv.dbg
      ? "Bugs fixed"
      : argv.msg
      ? argv.msg
      : `Changes made to: ${minimizeChanges.trim().replace(/\n/g, ", ")}`;

    execSync(`git commit -m "${commitMessage}"`, { stdio: "inherit" });

    const remote = argv.remote ? argv.remote : "origin";
    const branch = argv.branch ? argv.branch : "main";

    // Push phase
    let pushDecision = argv.autoPush;

    if (!argv.autoPush && !argv.skipPush) {
      console.log("\n" + chalk.green("Changes committed"));
      const answer =
        (await askQuestion(
          chalk.bgGreen(`\n Push to ${remote}/${branch}? (y/n): `)
        )) || "y";
      if (answer === "y") {
        pushDecision = true;
      } else {
        console.log("\n" + chalk.bold.green("🎉 Tasks completed successfully"));
        log.title("Info");
        console.log(chalk.cyan(`  Commit: ${commitMessage}`));
        return;
      }
    }

    // Git push
    if (pushDecision) {
      try {
        log.info(`Pushing changes to ${remote}/${branch}`);
        execSync(`git push ${remote} ${branch}`, { stdio: "inherit" });
      } catch (error) {
        if (error.message.includes("has no upstream branch")) {
          log.error("No upstream branch. Setting upstream...");
          execSync(`git push --set-upstream ${remote} ${branch}`, {
            stdio: "inherit",
          });
        } else {
          log.error("Pushing error:", error.message);
          process.exit(1);
        }
      }
    } else {
      log.info("<Push> phase skipped.");
    }

    console.log("\n" + chalk.bold.green("🎉 Tasks completed successfully"));
    log.title("Info");
    console.log(chalk.cyan(`  Remote: ${remote}`));
    console.log(chalk.cyan(`  Branch: ${branch}`));
    console.log(chalk.cyan(`  Commit: ${commitMessage}`));
  } catch (error) {
    log.error("\n❌ Xatolik yuz berdi:", error.message);
    process.exit(1);
  }
})();
