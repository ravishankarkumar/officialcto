# Rack Decommission: A Small Tool That Solved a Surprisingly Big Problem

Sometimes the highest-leverage engineering wins aren’t glamorous distributed systems—they’re the simple, human-centric tools that unblock an entire operational workflow. This is one such story from my time at Oracle Cloud Infrastructure (OCI).

> Due to NDA, this is a high-level description without internal specifics.



## Background

OCI is scaling fast, and with scale comes a long tail of operational tasks that haven’t yet been automated. One such task is **rack decommissioning**—the process of removing unhealthy or retired server racks from the data center floor.

On paper, it sounds trivial. In reality, it's a complex, multi-step, multi-team workflow involving:

* Traffic drain
* Data migration
* Network teardown
* Power disconnection
* Hardware extraction
* Inventory updates
* Contractor coordination

All of this work spans **infra teams, networking, hardware engineering, data center ops**, and **external staffing partners**. And every step tends to block the next.



## The Problem

Despite being a routine operation, rack decommissioning suffered from three chronic issues:

### 1. Fragmented Communication

Teams coordinated via email threads, WhatsApp groups, spreadsheets, and calls.
If one update got lost, a whole rack could sit idle for days.

In one instance, a rack waited **a full week** because a “power-down complete” update was buried in a long email chain.

### 2. No Single Source of Truth

Each team kept its own lists and trackers.
Nobody had real-time visibility into:

* What was blocked
* What was completed
* Which team was up next
* How many racks were expected tomorrow

This made execution unpredictable and slow.

### 3. Staffing Chaos

Data center work is heavily contractor-driven.
Staffing companies must know daily workloads to assign:

* power technicians
* network engineers
* hardware specialists

With no forecasting mechanism, they frequently overstaffed (wasteful) or understaffed (delays).

All this led to a staggering **60+ day average turnaround time** for decommissioning a single rack.



## The Proposal

From discussions with stakeholders, three insights emerged:

### Insight 1: We didn’t need a database—we needed shared truth.

Teams already lived inside Excel. Forcing them into a custom UI would reduce adoption.

### Insight 2: The process followed predictable templates.

Different rack types had different workflows, but each had well-understood step sequences and typical durations.

### Insight 3: We could make the system adaptive.

If teams edited the plan (because manual work always varies), those updates could feed back into revised ETAs.

So we proposed a simple but powerful tool:

### A centralized rack-decommission planning and workflow engine.

Key capabilities:

* Upload a list of racks needing decommission
* Auto-generate a step-by-step plan (like a lightweight Gantt chart)
* Use predefined step durations to project ETAs
* Let teams download, locally edit, and re-upload their Excel sheet
* Recalculate timelines and notify relevant teams instantly
* Use object storage as the “database,” avoiding schema overhead



## Why Object Storage?

Choosing object storage over a traditional DB was intentional:

* No schema migrations
* Excel remains the universal interface
* Versioning and auditability for free
* Simple infra footprint
* Perfect for append-only planning workflows

This made the system both **cheap to run** and **easy to adopt**.



## Execution

Engineers love to say “simple tool,” but this one truly was:

* Validating and parsing Excel uploads
* Maintaining a canonical plan in object storage
* Regenerating timelines
* Emitting notifications to downstream teams
* Ensuring the workflow stayed consistent across edits

The only major challenge was organizational: aligning teams on a standard Excel layout. Once that was solved, adoption was instant.



## The Result

The impact was far greater than expected.

### Turnaround time dropped from 60+ days → under 30 days.

A **50% improvement** across a globally scaling infrastructure.

### Why such a dramatic improvement?

#### 1. Staffing became predictable.

Agencies saw next-day and next-week workloads and staffed accordingly. This alone eliminated several days of latent delay per rack.

#### 2. No more communication silos.

Instead of 10 disconnected chat channels, there was one consistent workflow.
One network-cut notification now reliably triggered downstream actions, compressing wait times from *days into hours*.

#### 3. The feedback loop corrected real-world deviations.

If a manual step took longer (or finished early), teams adjusted the sheet; the system recalculated ETAs automatically.
Everyone always worked off the latest truth.



## Lessons Learned

1. **Small tools can create outsized impact** when they solve coordination, not computation.
2. **Excel is underrated**—when used deliberately, it becomes the most frictionless UI for operational teams.
3. **Deep stakeholder conversations reveal hidden leverage points.**
4. **Automation isn’t always about complex engineering**; sometimes it’s about creating shared context.



## **Closing Thought**

This project reinforced a belief I now carry into every engineering role:

> “The fastest way to accelerate a system is to remove friction between the humans operating it.”

OCI got a 50% faster rack-decommission pipeline; I got a reminder that elegant engineering can emerge from simple, thoughtful workflow design.

