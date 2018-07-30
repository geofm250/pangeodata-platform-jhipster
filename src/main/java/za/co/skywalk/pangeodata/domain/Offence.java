package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Offence.
 */
@Document(collection = "offence")
public class Offence implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("offence")
    private String offence;

    @Field("offence_date")
    private String offenceDate;

    @Field("sentence")
    private String sentence;

    @Field("verified_by")
    private String verifiedBy;

    @Field("verified_date")
    private String verifiedDate;

    @Field("remarks")
    private String remarks;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOffence() {
        return offence;
    }

    public Offence offence(String offence) {
        this.offence = offence;
        return this;
    }

    public void setOffence(String offence) {
        this.offence = offence;
    }

    public String getOffenceDate() {
        return offenceDate;
    }

    public Offence offenceDate(String offenceDate) {
        this.offenceDate = offenceDate;
        return this;
    }

    public void setOffenceDate(String offenceDate) {
        this.offenceDate = offenceDate;
    }

    public String getSentence() {
        return sentence;
    }

    public Offence sentence(String sentence) {
        this.sentence = sentence;
        return this;
    }

    public void setSentence(String sentence) {
        this.sentence = sentence;
    }

    public String getVerifiedBy() {
        return verifiedBy;
    }

    public Offence verifiedBy(String verifiedBy) {
        this.verifiedBy = verifiedBy;
        return this;
    }

    public void setVerifiedBy(String verifiedBy) {
        this.verifiedBy = verifiedBy;
    }

    public String getVerifiedDate() {
        return verifiedDate;
    }

    public Offence verifiedDate(String verifiedDate) {
        this.verifiedDate = verifiedDate;
        return this;
    }

    public void setVerifiedDate(String verifiedDate) {
        this.verifiedDate = verifiedDate;
    }

    public String getRemarks() {
        return remarks;
    }

    public Offence remarks(String remarks) {
        this.remarks = remarks;
        return this;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
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
        Offence offence = (Offence) o;
        if (offence.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), offence.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Offence{" +
            "id=" + getId() +
            ", offence='" + getOffence() + "'" +
            ", offenceDate='" + getOffenceDate() + "'" +
            ", sentence='" + getSentence() + "'" +
            ", verifiedBy='" + getVerifiedBy() + "'" +
            ", verifiedDate='" + getVerifiedDate() + "'" +
            ", remarks='" + getRemarks() + "'" +
            "}";
    }
}
