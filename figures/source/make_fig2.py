import sys
sys.path.insert(0, ".")
from helpers import *

fig, ax = new_fig(13.0, 7.6)

# Client
box(ax, 0.3, 3.3, 1.9, 1.2, "Referral\nPortal\n(Client)", fc=WHITE, ec=TEAL, fs=9.5)

# API Gateway
box(ax, 3.1, 5.4, 2.6, 0.9, "API Gateway", fc=TEAL, tc=WHITE, ec=TEAL, fs=11, bold=True)
arrow(ax, (2.2, 3.9), (2.2, 5.85), connectionstyle="arc3,rad=0", zorder=2)
arrow(ax, (2.2, 5.85), (3.1, 5.85))

# 4 services row
svc_y = 3.9
svc_w = 1.85
svc_h = 1.0
svc_x = [2.55, 4.65, 6.75, 8.85]
svc_labels = ["Authentication\nService", "Referral\nService", "Classification\nService", "Explanation\nService"]
for x, lab in zip(svc_x, svc_labels):
    box(ax, x, svc_y, svc_w, svc_h, lab, fc=WHITE, ec=TEAL, fs=9)
    arrow(ax, (x + svc_w / 2, 5.4), (x + svc_w / 2, svc_y + svc_h), connectionstyle="arc3,rad=0")

# data stores
cylinder(ax, 2.75, 1.6, 1.5, 1.2, "PostgreSQL\nDB", fc=TEAL, fs=8.5)
box(ax, 4.85, 1.7, 1.5, 1.0, "Object\nStorage", fc=WHITE, ec=SEA, fs=8.5)
cylinder(ax, 8.95, 1.6, 1.5, 1.2, "Redis\nCache", fc=SEA, fs=8.5)
arrow(ax, (3.47, svc_y), (3.47, 2.8))
arrow(ax, (5.6, svc_y), (5.6, 2.7))
arrow(ax, (9.7, svc_y), (9.7, 2.8))

# Classification service -> compliance/scheduling external APIs
box(ax, 6.6, 1.65, 1.9, 1.0, "MGTE Compliance\nAPI", fc=WHITE, ec=ORANGE, tc=INK, fs=8.5)
arrow(ax, (7.6, svc_y), (7.55, 2.65), connectionstyle="arc3,rad=-0.1")

actor(ax, 6.6, 0.15, 1.9, 1.0, "Ministry /\nRegulator", fc=SEA, fs=9)
arrow(ax, (7.55, 1.65), (7.55, 1.15))

# Referral service -> Scheduling API -> IPS/Specialist
box(ax, 8.85, 5.4, 2.6, 0.9, "Scheduling API", fc=WHITE, ec=ORANGE, tc=INK, fs=9.5)
arrow(ax, (5.57, 4.9), (5.57, 5.15), connectionstyle="arc3,rad=0")
arrow(ax, (5.57, 5.15), (10.15, 5.15), connectionstyle="arc3,rad=0")
arrow(ax, (10.15, 5.15), (10.15, 5.4), connectionstyle="arc3,rad=0")
actor(ax, 8.85, 6.45, 2.6, 0.7, "IPS / Specialist", fc=SEA, fs=9)
arrow(ax, (10.15, 6.3), (10.15, 6.45))



fig.tight_layout(rect=[0, 0, 1, 0.95])
fig.savefig("../fig2_application.png", facecolor="white", bbox_inches="tight", pad_inches=0.15)
print("fig2 done")
