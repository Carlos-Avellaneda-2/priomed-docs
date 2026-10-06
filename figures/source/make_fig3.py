import sys
sys.path.insert(0, ".")
from helpers import *

fig, ax = new_fig(15.8, 8.8)

# Outer AWS Cloud / VPC container (merged label to avoid stacked-label collisions)
container(ax, 0.4, 0.5, 13.4, 7.7, "AWS Cloud — VPC", fc="#F5FAFA", ec=TEAL, tc=TEAL, fs=12)

# App client outside VPC (left)
box(ax, -0.05, 5.9, 1.5, 1.0, "Referral\nPortal\n(Client)", fc=WHITE, ec=TEAL, fs=8.5)
arrow(ax, (1.45, 6.4), (1.75, 6.4))

# Public subnet
container(ax, 1.75, 5.75, 4.5, 1.35, "Public Subnet", fc="#FFF6EF", ec=ORANGE, tc=ORANGE, fs=9.5)
box(ax, 2.05, 5.95, 3.9, 0.75, "Application Load Balancer", fc=WHITE, ec=ORANGE, tc=INK, fs=9)

# Private subnet - compute
container(ax, 1.75, 2.85, 8.05, 2.55, "Private Subnet — Compute (Auto Scaling, EC2)", fc="#EEF7F7", ec=TEAL, tc=TEAL, fs=9.5)
svc_x = [2.05, 3.95, 5.85, 7.75]
svc_labels = ["API Gateway /\nAuth", "Referral\nService", "Classification\nService", "Explanation\nService"]
for x, lab in zip(svc_x, svc_labels):
    box(ax, x, 3.1, 1.75, 1.0, lab, fc=WHITE, ec=TEAL, fs=8.5)
arrow(ax, (3.95, 5.95), (2.9, 4.1), connectionstyle="arc3,rad=0.1", color=MUTE)

# Private subnet - data
container(ax, 1.75, 0.85, 4.9, 1.7, "Private Subnet — Data", fc="#EEF7F7", ec=TEAL, tc=TEAL, fs=9.5)
cylinder(ax, 2.05, 1.05, 1.7, 1.1, "PostgreSQL\n(RDS)", fc=TEAL, fs=8.5)
cylinder(ax, 4.25, 1.05, 1.7, 1.1, "Redis\n(ElastiCache)", fc=SEA, fs=8.5)
arrow(ax, (2.9, 3.1), (2.9, 2.15))
arrow(ax, (5.1, 3.1), (5.1, 2.15))

# Managed Services column (right, inside VPC, via endpoint)
container(ax, 10.15, 0.85, 3.35, 4.55, "Managed Services\n(VPC Endpoint)", fc="#FFFFFF", ec=BORDER, tc=MUTE, fs=9)
box(ax, 10.4, 4.0, 2.85, 0.9, "S3\n(referral documents)", fc=WHITE, ec=SEA, fs=8.5)
box(ax, 10.4, 2.7, 2.85, 0.9, "SQS\n(classification queue)", fc=WHITE, ec=SEA, fs=8.5)
box(ax, 10.4, 1.05, 2.85, 0.9, "Secrets Manager\n(OCR / LLM credentials)", fc=WHITE, ec=SEA, fs=8.5)
arrow(ax, (9.5, 4.1), (10.4, 4.4), connectionstyle="arc3,rad=-0.15")
arrow(ax, (9.5, 3.5), (10.4, 3.15), connectionstyle="arc3,rad=-0.1")
arrow(ax, (11.5, 2.7), (11.5, 3.6), connectionstyle="arc3,rad=0.35", color=MUTE)

# External LLM API (outside VPC, far right)
box(ax, 13.95, 2.55, 1.45, 1.0, "LLM API\n(external)", fc=WHITE, ec=ORANGE, tc=INK, fs=8.5)
arrow(ax, (13.25, 1.5), (13.95, 3.0), connectionstyle="arc3,rad=-0.2", color=ORANGE)


fig.savefig("../fig3_deployment.png", facecolor="white", bbox_inches="tight", pad_inches=0.2)
print("fig3 done")
