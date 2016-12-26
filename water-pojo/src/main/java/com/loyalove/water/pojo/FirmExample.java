package com.loyalove.water.pojo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class FirmExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    protected int limitStart = -1;

    protected int limit = -1;

    public FirmExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    public void setLimitStart(int limitStart) {
        this.limitStart=limitStart;
    }

    public int getLimitStart() {
        return limitStart;
    }

    public void setLimit(int limit) {
        this.limit=limit;
    }

    public int getLimit() {
        return limit;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andFirmIdIsNull() {
            addCriterion("firm_id is null");
            return (Criteria) this;
        }

        public Criteria andFirmIdIsNotNull() {
            addCriterion("firm_id is not null");
            return (Criteria) this;
        }

        public Criteria andFirmIdEqualTo(Integer value) {
            addCriterion("firm_id =", value, "firmId");
            return (Criteria) this;
        }

        public Criteria andFirmIdNotEqualTo(Integer value) {
            addCriterion("firm_id <>", value, "firmId");
            return (Criteria) this;
        }

        public Criteria andFirmIdGreaterThan(Integer value) {
            addCriterion("firm_id >", value, "firmId");
            return (Criteria) this;
        }

        public Criteria andFirmIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("firm_id >=", value, "firmId");
            return (Criteria) this;
        }

        public Criteria andFirmIdLessThan(Integer value) {
            addCriterion("firm_id <", value, "firmId");
            return (Criteria) this;
        }

        public Criteria andFirmIdLessThanOrEqualTo(Integer value) {
            addCriterion("firm_id <=", value, "firmId");
            return (Criteria) this;
        }

        public Criteria andFirmIdIn(List<Integer> values) {
            addCriterion("firm_id in", values, "firmId");
            return (Criteria) this;
        }

        public Criteria andFirmIdNotIn(List<Integer> values) {
            addCriterion("firm_id not in", values, "firmId");
            return (Criteria) this;
        }

        public Criteria andFirmIdBetween(Integer value1, Integer value2) {
            addCriterion("firm_id between", value1, value2, "firmId");
            return (Criteria) this;
        }

        public Criteria andFirmIdNotBetween(Integer value1, Integer value2) {
            addCriterion("firm_id not between", value1, value2, "firmId");
            return (Criteria) this;
        }

        public Criteria andFirmCodeIsNull() {
            addCriterion("firm_code is null");
            return (Criteria) this;
        }

        public Criteria andFirmCodeIsNotNull() {
            addCriterion("firm_code is not null");
            return (Criteria) this;
        }

        public Criteria andFirmCodeEqualTo(String value) {
            addCriterion("firm_code =", value, "firmCode");
            return (Criteria) this;
        }

        public Criteria andFirmCodeNotEqualTo(String value) {
            addCriterion("firm_code <>", value, "firmCode");
            return (Criteria) this;
        }

        public Criteria andFirmCodeGreaterThan(String value) {
            addCriterion("firm_code >", value, "firmCode");
            return (Criteria) this;
        }

        public Criteria andFirmCodeGreaterThanOrEqualTo(String value) {
            addCriterion("firm_code >=", value, "firmCode");
            return (Criteria) this;
        }

        public Criteria andFirmCodeLessThan(String value) {
            addCriterion("firm_code <", value, "firmCode");
            return (Criteria) this;
        }

        public Criteria andFirmCodeLessThanOrEqualTo(String value) {
            addCriterion("firm_code <=", value, "firmCode");
            return (Criteria) this;
        }

        public Criteria andFirmCodeLike(String value) {
            addCriterion("firm_code like", value, "firmCode");
            return (Criteria) this;
        }

        public Criteria andFirmCodeNotLike(String value) {
            addCriterion("firm_code not like", value, "firmCode");
            return (Criteria) this;
        }

        public Criteria andFirmCodeIn(List<String> values) {
            addCriterion("firm_code in", values, "firmCode");
            return (Criteria) this;
        }

        public Criteria andFirmCodeNotIn(List<String> values) {
            addCriterion("firm_code not in", values, "firmCode");
            return (Criteria) this;
        }

        public Criteria andFirmCodeBetween(String value1, String value2) {
            addCriterion("firm_code between", value1, value2, "firmCode");
            return (Criteria) this;
        }

        public Criteria andFirmCodeNotBetween(String value1, String value2) {
            addCriterion("firm_code not between", value1, value2, "firmCode");
            return (Criteria) this;
        }

        public Criteria andFirmNameIsNull() {
            addCriterion("firm_name is null");
            return (Criteria) this;
        }

        public Criteria andFirmNameIsNotNull() {
            addCriterion("firm_name is not null");
            return (Criteria) this;
        }

        public Criteria andFirmNameEqualTo(String value) {
            addCriterion("firm_name =", value, "firmName");
            return (Criteria) this;
        }

        public Criteria andFirmNameNotEqualTo(String value) {
            addCriterion("firm_name <>", value, "firmName");
            return (Criteria) this;
        }

        public Criteria andFirmNameGreaterThan(String value) {
            addCriterion("firm_name >", value, "firmName");
            return (Criteria) this;
        }

        public Criteria andFirmNameGreaterThanOrEqualTo(String value) {
            addCriterion("firm_name >=", value, "firmName");
            return (Criteria) this;
        }

        public Criteria andFirmNameLessThan(String value) {
            addCriterion("firm_name <", value, "firmName");
            return (Criteria) this;
        }

        public Criteria andFirmNameLessThanOrEqualTo(String value) {
            addCriterion("firm_name <=", value, "firmName");
            return (Criteria) this;
        }

        public Criteria andFirmNameLike(String value) {
            addCriterion("firm_name like", value, "firmName");
            return (Criteria) this;
        }

        public Criteria andFirmNameNotLike(String value) {
            addCriterion("firm_name not like", value, "firmName");
            return (Criteria) this;
        }

        public Criteria andFirmNameIn(List<String> values) {
            addCriterion("firm_name in", values, "firmName");
            return (Criteria) this;
        }

        public Criteria andFirmNameNotIn(List<String> values) {
            addCriterion("firm_name not in", values, "firmName");
            return (Criteria) this;
        }

        public Criteria andFirmNameBetween(String value1, String value2) {
            addCriterion("firm_name between", value1, value2, "firmName");
            return (Criteria) this;
        }

        public Criteria andFirmNameNotBetween(String value1, String value2) {
            addCriterion("firm_name not between", value1, value2, "firmName");
            return (Criteria) this;
        }

        public Criteria andFirmAdressIsNull() {
            addCriterion("firm_adress is null");
            return (Criteria) this;
        }

        public Criteria andFirmAdressIsNotNull() {
            addCriterion("firm_adress is not null");
            return (Criteria) this;
        }

        public Criteria andFirmAdressEqualTo(String value) {
            addCriterion("firm_adress =", value, "firmAdress");
            return (Criteria) this;
        }

        public Criteria andFirmAdressNotEqualTo(String value) {
            addCriterion("firm_adress <>", value, "firmAdress");
            return (Criteria) this;
        }

        public Criteria andFirmAdressGreaterThan(String value) {
            addCriterion("firm_adress >", value, "firmAdress");
            return (Criteria) this;
        }

        public Criteria andFirmAdressGreaterThanOrEqualTo(String value) {
            addCriterion("firm_adress >=", value, "firmAdress");
            return (Criteria) this;
        }

        public Criteria andFirmAdressLessThan(String value) {
            addCriterion("firm_adress <", value, "firmAdress");
            return (Criteria) this;
        }

        public Criteria andFirmAdressLessThanOrEqualTo(String value) {
            addCriterion("firm_adress <=", value, "firmAdress");
            return (Criteria) this;
        }

        public Criteria andFirmAdressLike(String value) {
            addCriterion("firm_adress like", value, "firmAdress");
            return (Criteria) this;
        }

        public Criteria andFirmAdressNotLike(String value) {
            addCriterion("firm_adress not like", value, "firmAdress");
            return (Criteria) this;
        }

        public Criteria andFirmAdressIn(List<String> values) {
            addCriterion("firm_adress in", values, "firmAdress");
            return (Criteria) this;
        }

        public Criteria andFirmAdressNotIn(List<String> values) {
            addCriterion("firm_adress not in", values, "firmAdress");
            return (Criteria) this;
        }

        public Criteria andFirmAdressBetween(String value1, String value2) {
            addCriterion("firm_adress between", value1, value2, "firmAdress");
            return (Criteria) this;
        }

        public Criteria andFirmAdressNotBetween(String value1, String value2) {
            addCriterion("firm_adress not between", value1, value2, "firmAdress");
            return (Criteria) this;
        }

        public Criteria andFirmTelIsNull() {
            addCriterion("firm_tel is null");
            return (Criteria) this;
        }

        public Criteria andFirmTelIsNotNull() {
            addCriterion("firm_tel is not null");
            return (Criteria) this;
        }

        public Criteria andFirmTelEqualTo(String value) {
            addCriterion("firm_tel =", value, "firmTel");
            return (Criteria) this;
        }

        public Criteria andFirmTelNotEqualTo(String value) {
            addCriterion("firm_tel <>", value, "firmTel");
            return (Criteria) this;
        }

        public Criteria andFirmTelGreaterThan(String value) {
            addCriterion("firm_tel >", value, "firmTel");
            return (Criteria) this;
        }

        public Criteria andFirmTelGreaterThanOrEqualTo(String value) {
            addCriterion("firm_tel >=", value, "firmTel");
            return (Criteria) this;
        }

        public Criteria andFirmTelLessThan(String value) {
            addCriterion("firm_tel <", value, "firmTel");
            return (Criteria) this;
        }

        public Criteria andFirmTelLessThanOrEqualTo(String value) {
            addCriterion("firm_tel <=", value, "firmTel");
            return (Criteria) this;
        }

        public Criteria andFirmTelLike(String value) {
            addCriterion("firm_tel like", value, "firmTel");
            return (Criteria) this;
        }

        public Criteria andFirmTelNotLike(String value) {
            addCriterion("firm_tel not like", value, "firmTel");
            return (Criteria) this;
        }

        public Criteria andFirmTelIn(List<String> values) {
            addCriterion("firm_tel in", values, "firmTel");
            return (Criteria) this;
        }

        public Criteria andFirmTelNotIn(List<String> values) {
            addCriterion("firm_tel not in", values, "firmTel");
            return (Criteria) this;
        }

        public Criteria andFirmTelBetween(String value1, String value2) {
            addCriterion("firm_tel between", value1, value2, "firmTel");
            return (Criteria) this;
        }

        public Criteria andFirmTelNotBetween(String value1, String value2) {
            addCriterion("firm_tel not between", value1, value2, "firmTel");
            return (Criteria) this;
        }

        public Criteria andCreateUserIsNull() {
            addCriterion("create_user is null");
            return (Criteria) this;
        }

        public Criteria andCreateUserIsNotNull() {
            addCriterion("create_user is not null");
            return (Criteria) this;
        }

        public Criteria andCreateUserEqualTo(Integer value) {
            addCriterion("create_user =", value, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserNotEqualTo(Integer value) {
            addCriterion("create_user <>", value, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserGreaterThan(Integer value) {
            addCriterion("create_user >", value, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserGreaterThanOrEqualTo(Integer value) {
            addCriterion("create_user >=", value, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserLessThan(Integer value) {
            addCriterion("create_user <", value, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserLessThanOrEqualTo(Integer value) {
            addCriterion("create_user <=", value, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserIn(List<Integer> values) {
            addCriterion("create_user in", values, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserNotIn(List<Integer> values) {
            addCriterion("create_user not in", values, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserBetween(Integer value1, Integer value2) {
            addCriterion("create_user between", value1, value2, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserNotBetween(Integer value1, Integer value2) {
            addCriterion("create_user not between", value1, value2, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNull() {
            addCriterion("create_time is null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNotNull() {
            addCriterion("create_time is not null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeEqualTo(Date value) {
            addCriterion("create_time =", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotEqualTo(Date value) {
            addCriterion("create_time <>", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThan(Date value) {
            addCriterion("create_time >", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("create_time >=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThan(Date value) {
            addCriterion("create_time <", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThanOrEqualTo(Date value) {
            addCriterion("create_time <=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIn(List<Date> values) {
            addCriterion("create_time in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotIn(List<Date> values) {
            addCriterion("create_time not in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeBetween(Date value1, Date value2) {
            addCriterion("create_time between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotBetween(Date value1, Date value2) {
            addCriterion("create_time not between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeIsNull() {
            addCriterion("update_time is null");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeIsNotNull() {
            addCriterion("update_time is not null");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeEqualTo(Date value) {
            addCriterion("update_time =", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeNotEqualTo(Date value) {
            addCriterion("update_time <>", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeGreaterThan(Date value) {
            addCriterion("update_time >", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("update_time >=", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeLessThan(Date value) {
            addCriterion("update_time <", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeLessThanOrEqualTo(Date value) {
            addCriterion("update_time <=", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeIn(List<Date> values) {
            addCriterion("update_time in", values, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeNotIn(List<Date> values) {
            addCriterion("update_time not in", values, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeBetween(Date value1, Date value2) {
            addCriterion("update_time between", value1, value2, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeNotBetween(Date value1, Date value2) {
            addCriterion("update_time not between", value1, value2, "updateTime");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}