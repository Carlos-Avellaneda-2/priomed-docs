import sys
sys.path.insert(0, ".")
from helpers import *

fig, ax = new_fig(11.5, 6.2)

# Actors
actor(ax, 0.3, 3.0, 2.1, 1.3, "Referring\nPhysician /\nPatient", fc=SEA)
actor(ax, 9.1, 3.35, 2.1, 1.3, "Ministry of\nHealth\n(MGTE Audit)", fc=SEA)
actor(ax, 9.1, 0.7, 2.1, 1.2, "IPS /\nSpecialist", fc=SEA)

# Capture box
box(ax, 2.9, 3.15, 1.7, 1.0, "Referral\nCapture", fc=WHITE, ec=TEAL, fs=10)

# Platform cylinder (center)
cylinder(ax, 4.95, 2.6, 2.5, 2.1, "PrioMed\nPlatform\n(rules + ML +\nexplanation)", fc=TEAL, fs=10)

# Priority + explanation loop (top)
box(ax, 4.7, 5.15, 3.0, 0.75, "Priority + Explanation", fc=WHITE, ec=ORANGE, tc=INK, fs=9.5)
arrow(ax, (6.2, 4.7), (6.2, 5.15), color=ORANGE)
arrow(ax, (4.7, 5.5), (1.35, 4.3), color=ORANGE, connectionstyle="arc3,rad=0.15")

# Capture -> platform -> analytics
arrow(ax, (2.4, 3.65), (2.9, 3.65))
arrow(ax, (4.6, 3.65), (4.95, 3.65))
box(ax, 7.65, 3.55, 1.55, 1.0, "Compliance\nAnalytics", fc=WHITE, ec=TEAL, fs=9.5)
arrow(ax, (7.45, 3.9), (7.65, 4.0))
arrow(ax, (9.2, 4.05), (9.1, 4.0))

# IPS availability ingestion (bottom) -> platform
box(ax, 7.35, 0.75, 1.85, 1.0, "Schedule Availability\nIngestion", fc=WHITE, ec=SEA, fs=9)
arrow(ax, (9.1, 1.3), (9.2, 1.25))
arrow(ax, (7.35, 1.25), (6.2, 2.6), connectionstyle="arc3,rad=-0.1")

fig.tight_layout()
fig.savefig("../fig1_enterprise.png", facecolor="white", bbox_inches="tight", pad_inches=0.15)
print("fig1 done")
