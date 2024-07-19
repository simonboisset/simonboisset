import { cn } from "~/ui/utils";
import { gradiant, IconProps } from "./gradiant";

export const ManAvatarIcon = ({ className, color = "orange" }: IconProps) => (
  <svg
    className={cn(className, "text-foreground")}
    width="960"
    height="960"
    viewBox="0 0 960 960"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_38_4071)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M797.4 794L795.436 792.051C750.7 737.361 677.051 704.422 606.451 707.113L605.909 706.826C605.434 707.789 604.786 708.655 603.996 709.382C601.187 711.971 597.006 712.31 593.18 712.496L592.843 712.513C560.796 714.115 528.764 715.717 496.698 717.083L496.732 717.777C494.735 749.769 493.241 783.406 491.747 817.044C490.254 850.681 488.76 884.319 486.762 916.31L486.695 919.915C489.403 919.966 492.111 920 494.836 920C612.68 920 719.47 871.93 797.4 794ZM628.565 718.481C627.163 718.475 626.021 719.607 626.016 721.01C626.01 722.412 627.142 723.553 628.544 723.559C680.418 723.773 731.768 747.59 765.435 787.056C766.345 788.123 767.948 788.25 769.015 787.34C770.081 786.43 770.208 784.827 769.298 783.76C734.671 743.168 681.918 718.701 628.565 718.481Z"
        fill="url(#paint0_linear_38_4071)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M605.914 706.826C607.607 703.525 607.471 699.226 607.201 695.383C606.515 685.989 605.827 676.596 605.136 667.204C604.831 663.073 604.326 658.503 601.226 655.761C598.297 653.171 593.998 653.053 590.071 653.087C575.034 653.177 559.992 653.273 544.944 653.374C511.751 653.593 478.541 653.882 445.331 654.593C435.344 654.793 425.358 655.183 415.388 655.893C409.537 656.299 403.691 656.824 397.852 657.468C387.95 658.585 377.252 660.514 370.532 667.878C364.303 674.699 362.983 684.703 363.524 693.928C363.829 699.243 364.794 704.795 367.367 709.365C368.225 710.889 369.278 712.294 370.498 713.546C377.282 720.367 388.068 720.635 397.682 720.435C430.703 719.69 463.713 718.505 496.703 717.083C528.746 715.718 560.748 714.118 592.77 712.517L593.185 712.496C597.011 712.31 601.192 711.971 604.001 709.382C604.791 708.655 605.439 707.789 605.914 706.826ZM596.061 664.834C595.976 663.434 594.772 662.369 593.373 662.453C591.973 662.538 590.907 663.742 590.992 665.142C591.741 677.491 592.491 689.84 593.241 702.189C593.326 703.588 594.53 704.654 595.929 704.569C597.329 704.484 598.395 703.281 598.31 701.881C597.56 689.532 596.81 677.183 596.061 664.834Z"
        fill="url(#paint1_linear_38_4071)"
      />
      <path
        d="M496.731 717.777C492.737 781.76 490.756 852.327 486.761 916.31L486.694 919.915C367.919 917.681 260.841 866.6 184.045 785.551L185.196 784.451C230.526 734.772 298.469 706.606 365.634 709.635L367.361 709.365C368.218 710.889 369.271 712.294 370.492 713.545C377.28 720.367 388.062 720.638 397.676 720.435C430.7 719.69 463.707 718.505 496.697 717.083L496.731 717.777Z"
        fill="url(#paint2_linear_38_4071)"
      />
      <path
        d="M415.348 655.453C413.537 595.668 411.72 535.894 409.897 476.132C409.187 452.909 408.482 429.68 407.782 406.445C406.969 379.515 407.849 348.607 428.551 331.376C449.083 314.297 479.584 318.833 505.211 326.382C536.594 335.641 567.111 348.014 599.07 355.073C605.976 356.596 612.983 357.866 620.059 358.78C645.686 362.131 671.905 360.946 695.687 351.28C702.525 348.504 709.313 344.88 713.887 339.059C718.458 333.253 720.336 324.841 716.816 318.341C713.633 312.417 706.916 309.37 700.448 307.474C681.618 302.053 661.518 303.078 643.337 310.386C642.406 310.758 641.492 311.147 640.578 311.553"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M407.968 476.183C404.753 491.288 396.232 504.74 383.949 514.1C379.449 517.519 373.336 520.38 368.309 517.773C364.009 515.522 362.418 510.19 361.809 505.383C359.818 489.044 363.989 472.55 373.509 459.122C368.55 465.402 363.285 471.935 355.939 475.084C348.593 478.233 338.556 476.641 334.849 469.566C331.819 463.76 334.036 456.414 338.065 451.251C342.094 446.088 347.679 442.398 352.503 437.981C371.478 420.665 377.741 393.396 378.858 367.735C379.975 342.074 376.996 316.075 381.803 290.854C383.818 280.309 387.829 269.154 397.003 263.585C405.264 258.558 415.657 259.285 425.303 259.997C455.705 262.262 486.211 262.793 516.673 261.588C535.597 260.843 557.348 257.83 567.473 241.818C571.349 235.69 573.008 228.242 577.544 222.572C582.081 216.919 591.644 214.024 596.333 219.559C599.887 223.759 598.584 230.003 598.364 235.487C598.144 240.987 601.038 248.013 606.523 247.522C610.839 247.149 613.141 242.308 614.207 238.111C616.526 229.072 617.237 219.441 621.607 211.197C625.991 202.954 635.758 196.403 644.492 199.687C655.392 203.767 656.527 219.17 652.228 229.987C647.929 240.804 640.142 250.62 639.566 262.249C651.094 257.306 659.828 247.506 670.766 241.379C681.701 235.234 697.714 234.134 704.857 244.442C710.057 251.924 708.123 262.588 702.775 269.968C697.426 277.331 689.335 282.138 681.481 286.742C668.634 294.275 655.786 301.813 642.939 309.356"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M582.685 376.654C571.823 372.561 560.438 370.019 548.865 369.105C537.575 368.225 524.22 370.005 518.565 379.805C514.198 387.405 516.165 396.918 518.26 405.432C524.05 428.875 529.839 452.329 535.627 475.796C537.235 482.313 538.827 489.303 536.388 495.566C533.968 501.812 525.725 506.179 520.325 502.218"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M484.239 408.527C482.053 406.683 479.499 405.327 476.747 404.551C473.994 403.774 471.108 403.595 468.281 404.024C465.454 404.454 462.751 405.483 460.354 407.042C457.957 408.601 455.92 410.654 454.381 413.064"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M568.94 412.183C562.559 404.939 550.812 403.161 542.586 408.206"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M490.029 551.067C485.942 552.724 481.502 553.316 477.123 552.787C472.745 552.257 468.573 550.624 464.999 548.04C461.425 545.456 458.567 542.006 456.692 538.015C454.817 534.023 453.987 529.62 454.28 525.22"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M544.922 651.865C544.922 638.323 544.262 630.639 543.975 618.519C543.704 606.383 545.701 593.248 554.249 584.632C561.426 577.404 571.92 574.662 580.401 568.992C591.251 561.73 598.343 549.865 602.287 537.424C606.231 524.983 607.314 511.847 608.397 498.831C612.155 453.078 615.924 407.325 619.704 361.573"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M415.382 655.893C409.525 656.3 403.679 656.824 397.846 657.467C387.946 658.585 377.246 660.514 370.526 667.877C364.297 674.699 362.977 684.703 363.518 693.928C363.823 699.243 364.788 704.794 367.361 709.365C368.219 710.888 369.272 712.294 370.492 713.546C377.28 720.367 388.062 720.638 397.676 720.435C430.7 719.69 463.707 718.505 496.697 717.083C528.875 715.712 561.019 714.104 593.179 712.496C597.005 712.31 601.186 711.971 603.995 709.382C604.785 708.655 605.433 707.788 605.908 706.826C607.601 703.526 607.465 699.226 607.195 695.383C606.501 685.989 605.813 676.595 605.13 667.2C604.83 663.07 604.317 658.5 601.22 655.758C598.291 653.168 593.992 653.05 590.065 653.083C575.034 653.185 559.991 653.281 544.938 653.371C511.745 653.591 478.538 653.879 445.325 654.59C435.338 654.793 425.352 655.182 415.382 655.893Z"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M365.635 709.635C298.47 706.606 230.527 734.772 185.197 784.451"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M496.732 717.777C492.738 781.76 490.757 852.327 486.762 916.31"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M606.451 707.113C677.051 704.422 750.7 737.361 795.437 792.051"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M184.045 785.552C109.043 706.419 62.9004 598.7 62.9004 480.008C62.9004 236.992 256.288 40 494.835 40C733.382 40 926.77 236.992 926.77 480.008C926.77 602.981 877.242 714.172 797.399 793.998C719.469 871.928 612.679 919.998 494.835 919.998C492.11 919.998 489.402 919.964 486.694 919.913C367.919 917.681 260.841 866.6 184.045 785.552Z"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M254.093 456.516C241.993 446.988 229.893 437.46 217.793 427.93"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M249.201 423.646C240.839 436.79 232.475 449.933 224.109 463.075"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M186.469 647.675L154.209 597.493"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M147.041 642.3C160.185 626.767 173.328 611.234 186.47 595.7"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M361.027 193.425C351.555 182.947 340.865 173.64 329.184 165.7"
        stroke="url(#paint3_linear_38_4071)"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M328.055 199.617L356.731 154.81"
        stroke="url(#paint4_linear_38_4071)"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M567.248 163.587C555.004 156.19 544.944 145.674 538.098 133.114"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M532.061 165.315C542.183 152.743 552.308 140.172 562.434 127.602"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M745.771 631.445C735.131 618.21 724.492 604.976 713.854 591.745"
        stroke="url(#paint5_linear_38_4071)"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M709.773 627.927L740.241 602.837"
        stroke="url(#paint6_linear_38_4071)"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M719.75 453.021L752.793 482.821"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M727.68 406.166C765.836 410.037 804.296 409.83 842.408 405.548"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M756.271 355.393C771.276 342.33 786.282 329.269 801.289 316.208"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M331.856 496.28C321.333 488.936 316.575 474.297 320.771 462.168"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M310.615 502.255C308.836 500.837 307.471 498.968 306.662 496.842C305.854 494.716 305.632 492.411 306.02 490.17"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M666.775 374.054C676.639 374.727 686.456 372.197 694.765 366.842"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M575.451 713.183C574.833 694.333 574.216 675.484 573.6 656.636"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M543.059 715.58C543.035 695.4 543.009 675.221 542.982 655.042"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M512.873 714.8C511.38 694.925 510.788 675.009 511.097 655.052"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M475.969 717.188C475.302 696.739 474.634 676.29 473.963 655.841"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M441.033 718.766C441.074 698.322 441.115 677.878 441.155 657.434"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M407.728 719.568C407.286 699.386 406.842 679.205 406.398 659.025"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M384.634 719.593C381.298 699.859 380.338 679.796 381.776 659.834"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M704.153 816.016L692.217 803.26"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M658.512 799.047C662.107 792.49 666.518 786.414 671.639 780.964"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M700.2 753.9C694.614 751.337 689.724 747.474 685.938 742.634"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M630.973 771.309C626.735 767.051 622.496 762.793 618.258 758.535"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M630.915 846.244C626.693 841.706 622.471 837.167 618.25 832.628"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M645.273 880.459L658.015 865.322"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M587.14 866.932L571.17 882.824"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M553.776 842.159L544.244 829.4"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M579.168 806.388L591.117 792.847"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M557.675 776.9L544.264 765.753"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M571.133 745.828C572.812 740.613 575.873 735.951 579.991 732.338"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M529.782 874.1C526.256 878.015 522.73 881.93 519.203 885.847"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M510.029 816.893L522.705 803.293"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M461.192 896.475L447.654 881.338"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M405.6 851.059C411.245 844.237 417.496 837.939 424.275 832.242"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M454.111 843.825C457.784 838.223 462.472 833.356 467.932 829.476L466.775 830.136"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M456.482 800.83L442.227 787.016"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M466.059 770.543L475.618 758.594"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M444.958 749.45L430.164 735.55"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M413.354 758.454L397.279 773.434"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M374.648 824.535L362.648 811.041"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M326.623 862.908L340.155 847.766"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M306.123 791.413C311.404 785.809 316.684 780.205 321.965 774.602"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M344.655 742.267L329.793 729.988"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M265.912 765.576C270.101 760.766 274.291 755.956 278.482 751.146C278.171 751.359 277.944 751.674 277.84 752.037C277.736 752.399 277.761 752.786 277.911 753.132"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M264.531 818.335C260.151 813.469 251.887 804.296 249.631 802.058"
        stroke="currentColor"
        stroke-width="5.078"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M700.444 307.475C681.614 302.055 661.514 303.079 643.333 310.386L642.939 309.356C655.786 301.813 668.633 294.275 681.481 286.742C689.335 282.138 697.426 277.331 702.775 269.968C708.123 262.588 710.057 251.924 704.857 244.442C697.713 234.134 681.701 235.234 670.766 241.379C666.021 244.037 661.69 247.387 657.366 250.731C651.723 255.095 646.092 259.451 639.566 262.249C639.952 254.452 643.58 247.469 647.224 240.454C649.015 237.006 650.81 233.551 652.227 229.987C656.527 219.17 655.392 203.767 644.492 199.687C635.758 196.403 625.991 202.954 621.607 211.197C618.569 216.928 617.3 223.329 616.029 229.735L616.029 229.736C615.471 232.546 614.914 235.356 614.207 238.111C613.141 242.308 610.839 247.149 606.523 247.522C601.038 248.013 598.144 240.987 598.364 235.487C598.403 234.505 598.478 233.498 598.552 232.483C598.895 227.832 599.25 223.007 596.333 219.559C591.644 214.024 582.08 216.919 577.544 222.572C574.974 225.785 573.327 229.569 571.677 233.361C570.416 236.26 569.153 239.163 567.473 241.818C557.348 257.83 535.597 260.843 516.673 261.588C486.211 262.793 455.705 262.262 425.303 259.997C415.656 259.285 405.264 258.558 397.003 263.585C387.829 269.154 383.817 280.309 381.803 290.854C378.653 307.38 378.846 324.239 379.04 341.119C379.141 350.001 379.243 358.888 378.858 367.735C377.741 393.396 371.478 420.665 352.503 437.981C350.913 439.437 349.241 440.813 347.569 442.19C344.167 444.99 340.766 447.789 338.065 451.251C334.036 456.414 331.819 463.76 334.849 469.566C338.556 476.641 348.593 478.232 355.939 475.084C363.285 471.936 368.55 465.402 373.509 459.122C363.99 472.55 359.818 489.044 361.809 505.383C362.418 510.19 364.009 515.522 368.309 517.773C373.336 520.38 379.449 517.519 383.949 514.1C396.23 504.74 404.75 491.288 407.964 476.184L409.893 476.133C409.194 452.899 408.489 429.67 407.778 406.446C406.965 379.516 407.847 348.608 428.547 331.376C449.079 314.297 479.58 318.834 505.207 326.383C516.816 329.808 528.308 333.66 539.797 337.511C559.366 344.069 578.93 350.627 599.066 355.074C605.972 356.597 612.98 357.867 620.055 358.781C645.683 362.131 671.901 360.946 695.683 351.281C702.525 348.505 709.313 344.883 713.883 339.06C718.453 333.254 720.332 324.842 716.812 318.342C713.629 312.418 706.91 309.375 700.444 307.475ZM694.981 313.106C691.644 312.068 688.069 312.083 684.741 313.148C683.405 313.575 682.669 315.004 683.096 316.34C683.524 317.675 684.953 318.411 686.289 317.984C688.623 317.237 691.132 317.227 693.473 317.955C695.813 318.683 697.873 320.114 699.372 322.054C700.871 323.994 701.737 326.348 701.851 328.797C701.965 331.246 701.323 333.67 700.011 335.741C699.26 336.926 699.612 338.494 700.797 339.245C701.982 339.995 703.55 339.643 704.301 338.459C706.171 335.507 707.086 332.051 706.923 328.56C706.761 325.07 705.527 321.714 703.39 318.949C701.254 316.184 698.317 314.144 694.981 313.106ZM636.975 206.966C637.608 205.714 639.135 205.213 640.387 205.846C647.866 209.63 651.031 219.814 647.008 227.173C646.335 228.403 644.793 228.855 643.562 228.183C642.332 227.51 641.88 225.967 642.552 224.737C645.199 219.896 643.015 212.867 638.094 210.377C636.843 209.744 636.342 208.217 636.975 206.966ZM692.057 243.684C690.844 242.981 689.29 243.395 688.587 244.608C687.884 245.822 688.298 247.375 689.512 248.078C691.205 249.059 692.638 250.433 693.688 252.084C694.739 253.735 695.377 255.615 695.548 257.565C695.719 259.514 695.419 261.476 694.672 263.285C693.925 265.094 692.754 266.697 691.258 267.958C690.186 268.862 690.049 270.464 690.953 271.536C691.856 272.608 693.458 272.745 694.53 271.841C696.65 270.055 698.308 267.785 699.366 265.223C700.424 262.66 700.849 259.881 700.606 257.12C700.364 254.359 699.46 251.697 697.972 249.358C696.484 247.019 694.455 245.073 692.057 243.684Z"
        fill="currentColor"
      />
      <path
        d="M236.526 291.965L268.888 287.97C269.161 287.936 269.438 287.987 269.682 288.116C269.925 288.244 270.124 288.445 270.25 288.689C270.376 288.934 270.425 289.212 270.389 289.485C270.352 289.758 270.233 290.013 270.048 290.217L248.055 314.293C247.875 314.489 247.758 314.735 247.717 314.998C247.677 315.261 247.715 315.53 247.828 315.772L261.628 345.316C261.745 345.565 261.782 345.845 261.736 346.117C261.689 346.388 261.56 346.639 261.366 346.835C261.173 347.031 260.924 347.163 260.653 347.214C260.382 347.264 260.102 347.23 259.851 347.116L230.158 333.641C229.915 333.53 229.646 333.494 229.383 333.537C229.12 333.58 228.876 333.701 228.682 333.883L204.848 356.136C204.646 356.324 204.392 356.446 204.12 356.485C203.847 356.524 203.569 356.479 203.323 356.355C203.077 356.231 202.874 356.035 202.743 355.793C202.612 355.55 202.559 355.274 202.59 355L206.231 322.6C206.261 322.335 206.211 322.068 206.089 321.831C205.967 321.594 205.777 321.399 205.544 321.271L177.014 305.48C176.772 305.347 176.577 305.143 176.455 304.895C176.333 304.648 176.29 304.369 176.332 304.097C176.374 303.824 176.498 303.571 176.688 303.371C176.878 303.171 177.125 303.035 177.396 302.98L209.34 296.429C209.6 296.375 209.839 296.245 210.027 296.056C210.214 295.867 210.341 295.627 210.393 295.366L216.593 263.353C216.644 263.081 216.778 262.832 216.976 262.638C217.173 262.445 217.426 262.317 217.699 262.273C217.972 262.228 218.252 262.268 218.501 262.388C218.751 262.508 218.957 262.702 219.093 262.943L235.193 291.299C235.324 291.529 235.521 291.715 235.758 291.834C235.995 291.952 236.262 291.998 236.526 291.965V291.965Z"
        fill="url(#paint7_linear_38_4071)"
      />
      <path
        d="M813.512 542.649L834.071 540.112C834.245 540.09 834.421 540.122 834.576 540.204C834.731 540.285 834.857 540.413 834.938 540.568C835.018 540.724 835.048 540.901 835.025 541.074C835.002 541.248 834.926 541.41 834.807 541.539L820.836 556.834C820.722 556.959 820.648 557.115 820.622 557.282C820.596 557.449 820.621 557.62 820.692 557.773L829.458 576.543C829.532 576.702 829.556 576.879 829.526 577.051C829.496 577.224 829.414 577.383 829.291 577.507C829.168 577.632 829.01 577.715 828.838 577.747C828.666 577.779 828.488 577.757 828.329 577.685L809.465 569.124C809.311 569.054 809.14 569.031 808.973 569.059C808.806 569.086 808.651 569.163 808.527 569.278L793.386 583.415C793.258 583.534 793.097 583.612 792.924 583.637C792.751 583.662 792.574 583.633 792.417 583.554C792.261 583.476 792.133 583.351 792.049 583.197C791.966 583.044 791.932 582.868 791.951 582.694L794.263 562.108C794.282 561.94 794.251 561.77 794.173 561.619C794.095 561.469 793.974 561.345 793.826 561.263L775.7 551.231C775.547 551.146 775.423 551.017 775.346 550.86C775.269 550.703 775.241 550.526 775.268 550.353C775.294 550.18 775.373 550.019 775.493 549.892C775.614 549.765 775.771 549.678 775.942 549.643L796.235 545.481C796.401 545.447 796.553 545.364 796.672 545.244C796.791 545.124 796.872 544.971 796.904 544.805L800.845 524.468C800.878 524.296 800.963 524.139 801.089 524.017C801.214 523.895 801.374 523.815 801.546 523.786C801.719 523.758 801.896 523.783 802.054 523.858C802.212 523.933 802.343 524.055 802.429 524.207L812.658 542.221C812.742 542.369 812.868 542.488 813.02 542.564C813.172 542.64 813.343 542.67 813.512 542.649V542.649Z"
        fill="currentColor"
      />
      <g opacity="0.1">
        <path
          d="M583.506 347.3C577.161 342.827 570.261 340.649 562.923 338.321C555.342 335.917 547.709 333.694 540.023 331.652C536.712 330.933 533.465 329.951 530.311 328.715C526.749 326.992 523.085 325.489 519.339 324.215C517.531 323.665 515.706 323.015 513.867 322.579C508.881 321.396 516.967 324.39 510.088 320.364C506.241 318.113 501.223 317.558 497.025 316.146C489.605 313.605 481.832 312.247 473.991 312.122C469.525 312.055 464.966 313.451 460.591 313.282C463.138 313.382 458.742 313.016 458.284 313.052C455.24 313.282 452.234 313.872 449.329 314.81C434.988 319.469 422.649 330.923 415.029 343.792C398.918 370.984 401.748 404.699 402.437 434.966C403.163 466.866 404.96 498.716 405.854 530.608C406.858 566.475 407.917 602.341 409.031 638.208C409.351 648.295 417.685 657.998 428.344 657.521C438.644 657.06 447.863 649.03 447.656 638.208C447.073 607.654 446.432 577.102 445.734 546.551C445.054 516.668 445.288 486.766 444.547 456.887C444.173 441.804 443.605 426.725 443.298 411.641C443.16 404.863 443.134 398.076 443.571 391.308C443.65 390.084 443.744 388.86 443.853 387.637C443.912 386.981 444.779 380.982 443.994 385.825C444.555 382.197 445.315 378.602 446.27 375.057C446.697 373.515 447.17 371.985 447.691 370.474C448.169 369.097 448.67 365.003 447.811 369.854C448.194 367.69 450.116 365.154 451.174 363.196C452.397 360.929 453.843 357.329 455.851 355.657C452.944 358.076 454.592 357.157 455.48 356.23C456.83 354.818 458.094 353.356 459.537 352.03C460.149 351.468 463.909 348.266 460.143 351.395C461.225 350.495 467.7 346.213 464.394 348.142C461.86 349.62 465.95 347.257 466.08 347.176C467.347 346.269 468.67 345.444 470.041 344.704C467.641 345.758 472.877 344.299 472.881 344.298C470.804 344.548 473.828 344.311 473.991 344.309C478.276 344.26 482.554 344.472 486.832 344.425C490.52 344.385 494.132 344.151 497.832 344.387C501.593 344.539 505.36 344.365 509.092 343.869C513.27 343.449 517.946 345.047 522.174 345.119C526.069 345.186 529.269 345.074 533.122 345.941C541.188 347.756 549.226 349.706 557.235 351.789C565.199 353.865 572.748 356.232 581.049 356.389C586.211 356.489 587.242 349.936 583.509 347.305L583.506 347.3Z"
          fill="currentColor"
        />
      </g>
      <g opacity="0.1">
        <path
          d="M440.353 654.644C435.363 651.364 429.969 650.371 424.34 648.789C416.87 646.603 408.983 646.254 401.35 647.772C389.359 650.07 378.629 656.688 371.195 666.372C363.22 676.695 360.114 690.159 363.983 702.816C364.656 705.016 365.564 707.153 366.426 709.282C367.333 711.522 367.989 713.982 369.441 715.949C370.432 717.291 369.749 718.343 369.441 715.382C369.808 718.902 369.553 715.067 369.55 714.606C369.559 713.161 369.92 711.741 370.601 710.466L372.017 708.644C370.919 709.653 370.937 709.667 372.072 708.686C373.277 707.774 373.226 707.716 371.918 708.512C374.11 707.645 374.574 707.424 373.311 707.847C372.274 707.985 371.258 708.245 370.283 708.622C367.883 709.262 370.483 709.092 371.04 708.564C370.363 709.201 366.11 708.582 365.302 708.557C360.124 708.391 354.959 708.257 349.777 708.379C338.231 708.658 326.711 709.611 315.277 711.232C294.984 714.083 275.525 720.653 256.626 728.387C244.803 733.1 233.382 738.763 222.474 745.32C211.825 751.844 199.643 758.336 191.281 767.747C184.217 775.698 182.949 786.926 189.625 795.567C195.725 803.467 208.125 806.914 216.957 801.024C222.051 797.434 226.919 793.533 231.534 789.344C233.197 787.911 234.858 786.479 236.551 785.083C237.608 784.212 238.694 783.377 239.751 782.501C241.598 780.964 236.987 784.338 240.193 782.18C248.676 776.471 257.308 771.047 266.314 766.191C270.435 763.969 274.614 761.868 278.882 759.939C275.648 761.401 278.289 760.197 278.958 759.939C280.248 759.439 281.527 758.919 282.818 758.426C285.4 757.439 288 756.498 290.618 755.603C300.033 752.408 309.634 749.789 319.368 747.761C323.949 746.793 328.526 745.837 333.146 745.072C334.502 744.848 335.866 744.672 337.22 744.438C340.061 743.955 334.52 744.727 337.397 744.407C340.426 744.071 343.441 743.707 346.482 743.489C355.523 742.852 364.608 743.483 373.631 742.755C385.181 741.823 397.138 737.555 402.589 726.44C405.605 720.264 406.652 713.311 405.589 706.52C405.138 702.522 404.048 698.622 402.359 694.97C401.938 694.037 401.498 693.107 401.049 692.187C398.927 687.832 401.865 695.762 400.625 691.151C400.254 690.251 400.014 689.302 399.911 688.333C400.215 690.871 400.354 691.407 400.329 689.942C400.38 688.48 400.266 689.016 399.986 691.549C400.33 691.311 400.186 689.11 400.677 688.869C399.597 691.171 399.52 691.377 400.445 689.488L401.145 688.253C402.518 685.504 401.303 687.843 400.737 688.51C401.686 687.393 402.72 686.396 403.749 685.361C406.035 683.061 404.084 685.088 403.449 685.5C404.673 684.71 405.898 683.974 407.167 683.263C404.157 684.95 407.3 683.205 408.298 682.882C409.698 682.428 411.118 682.041 412.558 681.722C415.734 681.017 418.743 680.19 421.87 679.256C427.814 677.482 433.849 677.119 440.37 674.235C448.703 670.551 446.752 658.841 440.37 654.645L440.353 654.644Z"
          fill="currentColor"
        />
      </g>
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_38_4071"
        x1="642.048"
        y1="706.826"
        x2="642.048"
        y2="920"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color={gradiant[color].start} />
        <stop offset="1" stop-color={gradiant[color].end} />
      </linearGradient>
      <linearGradient
        id="paint1_linear_38_4071"
        x1="485.389"
        y1="653.083"
        x2="485.389"
        y2="720.476"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color={gradiant[color].start} />
        <stop offset="1" stop-color={gradiant[color].end} />
      </linearGradient>
      <linearGradient
        id="paint2_linear_38_4071"
        x1="340.388"
        y1="709.365"
        x2="340.388"
        y2="919.915"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color={gradiant[color].start} />
        <stop offset="1" stop-color={gradiant[color].end} />
      </linearGradient>
      <linearGradient
        id="paint3_linear_38_4071"
        x1="345.105"
        y1="165.7"
        x2="345.105"
        y2="193.425"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color={gradiant[color].start} />
        <stop offset="1" stop-color={gradiant[color].end} />
      </linearGradient>
      <linearGradient
        id="paint4_linear_38_4071"
        x1="342.393"
        y1="154.81"
        x2="342.393"
        y2="199.617"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color={gradiant[color].start} />
        <stop offset="1" stop-color={gradiant[color].end} />
      </linearGradient>
      <linearGradient
        id="paint5_linear_38_4071"
        x1="729.813"
        y1="591.745"
        x2="729.813"
        y2="631.445"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color={gradiant[color].start} />
        <stop offset="1" stop-color={gradiant[color].end} />
      </linearGradient>
      <linearGradient
        id="paint6_linear_38_4071"
        x1="725.007"
        y1="602.837"
        x2="725.007"
        y2="627.927"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color={gradiant[color].start} />
        <stop offset="1" stop-color={gradiant[color].end} />
      </linearGradient>
      <linearGradient
        id="paint7_linear_38_4071"
        x1="223.358"
        y1="262.255"
        x2="223.358"
        y2="356.499"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color={gradiant[color].start} />
        <stop offset="1" stop-color={gradiant[color].end} />
      </linearGradient>
      <clipPath id="clip0_38_4071">
        <rect width="960" height="960" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
