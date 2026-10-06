import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, Ellipse, FancyArrowPatch, Rectangle, Arc
from matplotlib.path import Path
import matplotlib.patches as mpatches

TEAL = "#028090"
SEA = "#00A896"
ORANGE = "#E85D04"
DARK = "#032B32"
INK = "#18292A"
MUTE = "#5B7275"
LIGHT = "#F7FAFA"
WHITE = "#FFFFFF"
BORDER = "#CFE0E0"

plt.rcParams["font.family"] = "DejaVu Sans"


def new_fig(w, h):
    fig, ax = plt.subplots(figsize=(w, h), dpi=200)
    ax.set_xlim(0, w)
    ax.set_ylim(0, h)
    ax.axis("off")
    fig.patch.set_facecolor(WHITE)
    ax.set_facecolor(WHITE)
    return fig, ax


def box(ax, x, y, w, h, text, fc=WHITE, ec=TEAL, tc=INK, fs=10.5, bold=False, zorder=3, pad=0.02):
    p = FancyBboxPatch((x, y), w, h, boxstyle=f"round,pad={pad},rounding_size=0.08",
                        linewidth=1.4, edgecolor=ec, facecolor=fc, zorder=zorder)
    ax.add_patch(p)
    ax.text(x + w / 2, y + h / 2, text, ha="center", va="center", fontsize=fs,
            color=tc, fontweight="bold" if bold else "normal", zorder=zorder + 1, wrap=True)
    return p


def actor(ax, x, y, w, h, text, fc=SEA, tc=WHITE, fs=10.5, zorder=3):
    e = Ellipse((x + w / 2, y + h / 2), w, h, facecolor=fc, edgecolor="none", zorder=zorder)
    ax.add_patch(e)
    ax.text(x + w / 2, y + h / 2, text, ha="center", va="center", fontsize=fs,
            color=tc, fontweight="bold", zorder=zorder + 1)
    return e


def cylinder(ax, x, y, w, h, text, fc=TEAL, tc=WHITE, fs=10.5, zorder=3):
    ell_h = h * 0.22
    body = Rectangle((x, y + ell_h / 2), w, h - ell_h, facecolor=fc, edgecolor="none", zorder=zorder)
    ax.add_patch(body)
    bottom = Ellipse((x + w / 2, y + ell_h / 2), w, ell_h, facecolor=fc, edgecolor="none", zorder=zorder)
    ax.add_patch(bottom)
    top = Ellipse((x + w / 2, y + h - ell_h / 2), w, ell_h, facecolor=fc, edgecolor="#01606B", linewidth=1.0, zorder=zorder + 1)
    ax.add_patch(top)
    ax.text(x + w / 2, y + h / 2 - ell_h * 0.15, text, ha="center", va="center", fontsize=fs,
            color=tc, fontweight="bold", zorder=zorder + 2)
    return body


def arrow(ax, p1, p2, color=MUTE, lw=1.6, style="-|>", connectionstyle="arc3,rad=0.0", zorder=2):
    a = FancyArrowPatch(p1, p2, arrowstyle=style, mutation_scale=14, linewidth=lw,
                         color=color, connectionstyle=connectionstyle, zorder=zorder, shrinkA=2, shrinkB=2)
    ax.add_patch(a)
    return a


def container(ax, x, y, w, h, text, fc="#F0F7F7", ec=BORDER, tc=MUTE, fs=10, zorder=0):
    p = FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.02,rounding_size=0.1",
                        linewidth=1.2, edgecolor=ec, facecolor=fc, zorder=zorder, linestyle="dashed")
    ax.add_patch(p)
    ax.text(x + 0.15, y + h - 0.28, text, ha="left", va="center", fontsize=fs,
            color=tc, fontweight="bold", zorder=zorder + 1)
    return p
