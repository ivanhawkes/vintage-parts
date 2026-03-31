package global

import (
	"github.com/ivanhawkes/snowflake/strategy"
	"github.com/jackc/pgx/v5/pgxpool"
	"go.uber.org/zap"
)

var DBPool *pgxpool.Pool
var Logs *zap.Logger
var SPool *strategy.StrategyPool
