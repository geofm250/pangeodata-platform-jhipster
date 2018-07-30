package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Rule.
 */
@Document(collection = "rule")
public class Rule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("country")
    private String country;

    @Field("rule")
    private String rule;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCountry() {
        return country;
    }

    public Rule country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getRule() {
        return rule;
    }

    public Rule rule(String rule) {
        this.rule = rule;
        return this;
    }

    public void setRule(String rule) {
        this.rule = rule;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Rule rule = (Rule) o;
        if (rule.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), rule.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Rule{" +
            "id=" + getId() +
            ", country='" + getCountry() + "'" +
            ", rule='" + getRule() + "'" +
            "}";
    }
}
