A grid toolkit
===========================

This toolkit implements the model described in the following paper for generating scenarios of grid-frequency deviations over 15-minute time steps:

T. Mercier, J. Jomaux, and E. De Jaeger, “Stochastic Programming for Valuing Energy Storage Providing Primary Frequency Control”.

# Installation

pip install grid_toolkit

# Use

import grid_toolkit

scenarios = grid_toolkit.generate(n,length,[start_year,start_month,start_day,start_hour])

# Note on arguments

All arguments are integers with n the number of scenarios you want to generate, length the number of time steps of the generated scenarios, start_year,start_month,start_day,start_hour] the starting date of the scenarios.

[start_year,start_month,start_day,start_hour] = [2015,1,1,0] corresponds to 1 January 2015 at midnight.

Note that daylight saving time is taken into account.

