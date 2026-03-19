package api

import (
	"fmt"
)

// ensure that we've conformed to the `ServerInterface` with a compile-time check
var _ ServerInterface = (*Server)(nil)

type Server struct{}

func NewServer() Server {
	return Server{}
}

func Quoted(s *string) string {
	if s == nil {
		return "''"
	}

	return fmt.Sprintf("'%s'", *s)
}

func NullOrValue(s *string) string {
	if s == nil {
		return "NULL"
	}

	return fmt.Sprintf("'%s'", *s)
}

func NullOrValueFK(k *ForeignKeyId) string {
	if k == nil {
		return "NULL"
	}

	return fmt.Sprintf("'%d'", *k)
}

func NullOrValueInt(k *int32) string {
	if k == nil {
		return "NULL"
	}

	return fmt.Sprintf("'%d'", *k)
}
